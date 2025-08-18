import {Category} from '../models/Category.js';
import { Question } from '../models/Question.js';
import URL from 'url';

const populate = async (req, res) => {
    try {
        const data= await fetch ('https://test-data-gules.vercel.app/data.json');
        if(!data.ok) {
            return res.status(500).json({ message: "Failed to fetch data" });
        }
        let jsonData = await data.json();
        let refined_data = Array.from(jsonData.data);

        console.log(typeof(refined_data));
        for (const element of refined_data) {
            const question_refs=[];
            for(const ques of element.ques) {
                if (!ques.title) {
                    console.warn(`Skipping question with missing fields: ${JSON.stringify(ques)}`);
                    continue; // Skip questions with missing fields
                }
                const question = new Question({
                    title: ques.title,
                    url:{yt_link:ques.yt_link, p1_link:ques.p1_link, p2_link:ques.p2_link}
                });

                const savedQuestion= await question.save();
                question_refs.push(savedQuestion._id);
            }

            const category= new Category({
                title: element.title,
                sl_no: element.sl_no,
                questions: question_refs
            });
            await category.save();
            console.log(`Category ${element.title} saved successfully`);
        }

        return res.status(200).json({message: "Data fetched successfully", data});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error populating database" });
    }
}

const search = async (req, res) => {
    const ques= URL.parse(req.url, true).query.q;
    if (!ques) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }
    console.log(`Searching for: ${ques}`);
    try {
        Question.find({title: { $regex: ques, $options: 'i' }})
        .then((questions) => {
            if (questions.length === 0) {
                return res.status(404).json({ message: "No questions found" });
            }

            // console.log(questions); 
            return res.status(200).json(questions);
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: "Error searching for questions" });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error searching for questions" });
    }
}

const all = async (req, res) => {
  try {
    const questions = await Question.find();

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    console.log("Questions have been sent!");
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { populate, search,all };