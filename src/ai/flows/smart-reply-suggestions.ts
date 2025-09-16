'use server';

/**
 * @fileOverview An AI agent that provides smart reply suggestions based on the chat history.
 *
 * - getSmartReplySuggestions - A function that generates smart reply suggestions.
 * - SmartReplySuggestionsInput - The input type for the getSmartReplySuggestions function.
 * - SmartReplySuggestionsOutput - The return type for the getSmartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplySuggestionsInputSchema = z.object({
  chatHistory: z.string().describe('The complete chat history as a single string.'),
  numberOfSuggestions: z.number().describe('The number of smart reply suggestions to generate.'),
});
export type SmartReplySuggestionsInput = z.infer<typeof SmartReplySuggestionsInputSchema>;

const SmartReplySuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of smart reply suggestions.'),
});
export type SmartReplySuggestionsOutput = z.infer<typeof SmartReplySuggestionsOutputSchema>;

export async function getSmartReplySuggestions(input: SmartReplySuggestionsInput): Promise<SmartReplySuggestionsOutput> {
  return smartReplySuggestionsFlow(input);
}

const smartReplySuggestionsPrompt = ai.definePrompt({
  name: 'smartReplySuggestionsPrompt',
  input: {schema: SmartReplySuggestionsInputSchema},
  output: {schema: SmartReplySuggestionsOutputSchema},
  prompt: `You are a helpful chatbot assistant that provides smart reply suggestions based on the chat history.

  Given the following chat history:
  {{chatHistory}}

  Generate {{numberOfSuggestions}} smart reply suggestions that the user can use to quickly respond to the latest message.
  The reply suggestions should be short, relevant, and appropriate for the context of the conversation.
  The suggestions should be diverse and cover different types of responses (e.g., agreement, disagreement, questions, acknowledgements).
  Make sure that the smart reply suggestions are not too generic, but specific to the context of the chat history.
  Output the reply suggestions as a JSON array of strings.`,
});

const smartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'smartReplySuggestionsFlow',
    inputSchema: SmartReplySuggestionsInputSchema,
    outputSchema: SmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await smartReplySuggestionsPrompt(input);
    return output!;
  }
);
