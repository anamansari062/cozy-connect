const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY+'',
});

const openai = new OpenAIApi(configuration);

const getEmotionsFromSentence = async(text)=>{

    const response = await openai.createCompletion("text-davinci-003", {
        prompt: `Given list of emotions and a sentence, tell me the emotion of the sentence from the given list. Gererate 3 best possible classifications. Generate only the response keywords, don't generate any other text. Keep the output characters in lowercase.\n\nList of emotions: [admiration, adoration, appreciation of beauty, amusement, anger, anxiety, awe, awkwardness, boredom, calmness, confusion, craving, disgust, empathic pain, entrancement, excitement, fear, horror, interest, joy, nostalgia, relief, sadness, satisfaction, and surprise]\n\nSentence: ${text}`,
        temperature: 0.23,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    console.log("LOOK");
    console.log(response.data.choices[0].text)

    return response.data.choices[0].text

}
getEmotionsFromSentence()

export default getEmotionsFromSentence;