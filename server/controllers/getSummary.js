const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateSummary(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
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

  const summaryType = req.body.type || 'normal';

  try {
    let prompt;
    if (summaryType === 'normal') {
      prompt = generatePrompt(text);
    } else if (summaryType === 'flashcard') {
      prompt = promptFlashCard(text);
    } else {
      res.status(400).json({
        error: {
          message: 'Invalid summary type',
        },
      });
      return;
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
      max_tokens: 1024,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    res.status(200).json({
      title: generateTitle(completion.data.choices[0].text),
      summary: completion.data.choices[0].text,
    });
  } catch (error) {
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
  return `Summarize the following text in 500 words or less. Create sections for each important point with a brief summary:${textForSummary}.`;
}

function promptFlashCard(text) {
  const textForSummary =
    text[0].toUpperCase() + text.slice(1).toLowerCase();
  return `Create a flash card for the following text:${textForSummary}.`;
}

function generateTitle(summary) {
  const maxTitleLength = 5;
  const words = summary.split(' ');
  let title = words.slice(0, maxTitleLength).join(' ');

  if (words.length > maxTitleLength) {
    title += '...';
  }

  return title;
}

module.exports = generateSummary;
