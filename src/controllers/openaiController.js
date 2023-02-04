const axios = require("axios")

const getEmotionsFromSentence = async(text) => {

    var data = JSON.stringify({
        "model": "text-davinci-003",
        "prompt": "Given list of emotions and a sentence, tell me the emotion of the sentence from the given list. Gererate 3 best possible classifications. Generate only the response keywords, don't generate any other text. Keep the output characters in lowercase.\n\nList of emotions: [admiration, adoration, appreciation of beauty, amusement, anger, anxiety, awe, awkwardness, boredom, calmness, confusion, craving, disgust, empathic pain, entrancement, excitement, fear, horror, interest, joy, nostalgia, relief, sadness, satisfaction, and surprise]\n\nSentence:" + text,
        "temperature": 0.7,
        "max_tokens": 350,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    });

    var config = {
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        data: data
    };

    var res = await axios(config)

    var emotions = res.data.choices[0].text.split(",")

    emotions[0] = (emotions[0] + "").replaceAll("\n", "")

    console.log(emotions)

    return emotions
}

export default getEmotionsFromSentence;