const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function openaiHandler(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const text = req.body.text || '';
  if (text.trim().length <= 20) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid text',
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(text),
      temperature: 0,
      max_tokens: 1024,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    
    res.status(200).json({
      title: generateTitle(completion.data.choices[0].text),
      summary: completion.data.choices[0].text
    });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

function generatePrompt(text) {
  const textForSummary =
    text[0].toUpperCase() + text.slice(1).toLowerCase();
  return `Summarize this text:${textForSummary}.`;
}

function generateTitle(summary) {
  const maxTitleLength = 10;
  const words = summary.split(' ');
  let title = words.slice(0, maxTitleLength).join(' ');

  if (words.length > maxTitleLength) {
    title += '...';
  }

  return title;
}

module.exports = openaiHandler;