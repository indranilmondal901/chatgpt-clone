const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summaryController = async (req, res) => {
  try {
    const text = req.body.text;
    // console.log(text)
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `summarize this \n ${text}`,
      max_tokens: 500,
      temperature: 0.5,
    })
    if (data) {
      // console.log(data)
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text)
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message
    })
  }
}
exports.paragraphController = async (req, res) => {
  try {
    const text = req.body.text;
    // console.log(text)
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write detail paragraph about \n ${text}`,
      max_tokens: 500,
      temperature: 0.8,
    })
    if (data) {
      // console.log(data)
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text)
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({
      message: error.message
    })
  }
}

// exports.chatController = async (req, res) => {
//   try {
//     const text = req.body.text;
//     // console.log(text)
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: `Answer question simmiler to how yuda from start war would.
//       Me:'What is your name?'
//       Indra:'Indra is my name.'
//       Me:'Who made you?'
//       Indra: 'Indranil made me'
//       Me: ${text}`,
//       max_tokens: 500,
//       temperature: 0.9,
//     })
//     if (data) {
//       // console.log(data)
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text)
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send({
//       message: error.message
//     })
//   }
// }
exports.chatController = async (req, res) => {
  try {
    const text = req.body.text;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
        Me: What is your name?
        AI: My name is Indranil.
        Me: Hello, I am Indra. What can I help you with today?
        AI: ${text}
        Me:`,
      max_tokens: 1000,
      temperature: 0.7,
      stop: "Me:"
    })
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text)
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({
      message: error.message
    })
  }
}
exports.JsConverterController = async (req, res) => {
  try {
    const text = req.body.text;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/*convert this code into javascript code \n ${text}`,
      max_tokens: 500,
      temperature: 0.7,
      stop: "Me:"
    })
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text)
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message
    })
  }
}

exports.ScifiimgController = async (req, res) => {
  try {
    const text = req.body.text;
    const { data } = await openai.createImage({
      prompt: `/*generate a scifi image of \n ${text}`,
      n: 1,
      size: '512x512'
    })
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url)
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({
      message: error.message
    })
  }
}