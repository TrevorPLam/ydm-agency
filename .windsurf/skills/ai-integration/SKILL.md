---
name: ai-integration
description: Comprehensive AI integration guide covering LLM provider APIs, structured outputs, function calling, RAG systems, vector search, and production AI workflow patterns for 2026
---

# AI Integration Guide

This skill provides comprehensive guidance for integrating Large Language Models (LLMs) and AI capabilities into production applications, following 2026 best practices for reliability, security, and performance.

## Structured Outputs

### Why Structured Outputs Matter

LLMs excel at creative tasks but struggle with consistent data formats. Structured outputs guarantee responses conform to predefined schemas, eliminating parsing errors and making AI responses directly usable in applications.

### Three Levels of Structure Enforcement

1. **Prompt Engineering** - "Please return JSON with these fields" (80-90% reliability)
2. **JSON Mode** - Guarantees syntactically valid JSON (doesn't enforce schema)
3. **Strict Mode / Constrained Decoding** - 100% schema compliance (production standard)

### Native Structured Output Support

As of 2026, all major providers support native structured output:
- **OpenAI**: `response_format: { type: "json_schema", json_schema: {...}, strict: true }`
- **Anthropic Claude**: `response_format: { type: "json_object", schema: {...} }`
- **Google Gemini**: `response_mime_type: "application/json", response_schema: {...}`

### Pydantic Patterns (Python)

```python
from pydantic import BaseModel, Field
from openai import OpenAI

class Product(BaseModel):
    name: str = Field(description="Product name")
    price: float = Field(description="Price in USD")
    in_stock: bool = Field(description="Whether product is in stock")

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Extract product info"}],
    response_format={
        "type": "json_schema",
        "json_schema": Product.model_json_schema(),
        "strict": True
    }
)
product = Product.model_validate_json(response.choices[0].message.content)
```

### Zod Patterns (TypeScript)

```typescript
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const ProductSchema = z.object({
  name: z.string().describe('Product name'),
  price: z.number().describe('Price in USD'),
  inStock: z.boolean().describe('Whether product is in stock'),
});

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Extract product info',
  schema: ProductSchema,
});
```

### Schema Design Best Practices

- **Put reasoning before answers**: Include a `reasoning` field for the model's thought process
- **Handle nulls explicitly**: Use optional fields or nullable types
- **Keep schemas focused**: One schema per use case, avoid mega-schemas
- **Add descriptions**: Help the model understand field purposes

## Function Calling

### When to Use Function Calling

Use function calling when the LLM needs to:
- Call external APIs or services
- Query databases or knowledge bases
- Execute tools or utilities
- Perform multi-step workflows

### Function Calling Workflow

1. Define function schemas with parameters
2. Pass functions to the LLM in the tools array
3. LLM returns function call requests
4. Execute functions and return results
5. Feed results back to LLM for final response

### OpenAI Function Calling Example

```python
import openai

def get_weather(location: str, unit: str = "celsius"):
    """Get current weather for a location"""
    # Implementation
    return {"temperature": 22, "condition": "sunny"}

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    }]
)
```

### Structured Output vs Function Calling

- **Structured Output**: Use when you need data extraction or classification
- **Function Calling**: Use when you need to trigger actions or call APIs
- Both can be combined: function returns structured data

## Retrieval-Augmented Generation (RAG)

### RAG Architecture

RAG combines LLMs with external knowledge bases to:
- Ground responses in factual data
- Reduce hallucinations
- Enable domain-specific knowledge
- Provide source attribution

### Vector Search Integration

```python
from openai import OpenAI
import chromadb

client = OpenAI()
chroma_client = chromadb.Client()
collection = chroma_client.create_collection("documents")

def query_rag(question: str):
    # Search vector database
    results = collection.query(
        query_texts=[question],
        n_results=3
    )
    
    # Build context from retrieved documents
    context = "\n".join(results['documents'][0])
    
    # Generate response with context
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "system",
            "content": f"Answer using this context:\n{context}"
        }, {
            "role": "user",
            "content": question
        }]
    )
    
    return response.choices[0].message.content
```

### RAG Best Practices

- **Chunk documents appropriately**: 500-1000 tokens per chunk
- **Use semantic chunking**: Split at natural boundaries
- **Include metadata**: Store source, date, relevance scores
- **Implement relevance scoring**: Filter low-quality matches
- **Add source attribution**: Show users where information came from

## Multi-Provider Integration

### Abstraction Layer

Create a unified interface for multiple providers:

```typescript
interface AIProvider {
  generateText(prompt: string, options?: GenerateOptions): Promise<string>;
  generateStructured<T>(prompt: string, schema: z.Schema<T>): Promise<T>;
  streamText(prompt: string): AsyncIterable<string>;
}

class OpenAIProvider implements AIProvider {
  async generateText(prompt: string) {
    // OpenAI implementation
  }
}

class AnthropicProvider implements AIProvider {
  async generateText(prompt: string) {
    // Anthropic implementation
  }
}
```

### Provider Selection Strategy

- **Cost optimization**: Use cheaper models for simple tasks
- **Capability matching**: Choose provider based on task requirements
- **Redundancy**: Failover between providers
- **Latency optimization**: Use fastest provider for real-time features

## Production Patterns

### Error Handling and Retries

```python
import tenacity

@tenacity.retry(
    stop=tenacity.stop_after_attempt(3),
    wait=tenacity.wait_exponential(multiplier=1, min=4, max=10),
    retry=tenacity.retry_if_exception_type(openai.APITimeoutError)
)
async def call_llm_with_retry(prompt: str):
    return await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
```

### Streaming Responses

```python
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Cost Optimization

- **Use smaller models**: GPT-3.5 for simple tasks, GPT-4 for complex reasoning
- **Cache responses**: Store and reuse common queries
- **Batch requests**: Process multiple prompts together
- **Token optimization**: Trim prompts, remove redundant context

### Monitoring and Observability

Track these metrics:
- **Latency**: Request/response times
- **Token usage**: Input/output tokens per request
- **Cost**: Per-request and aggregate costs
- **Error rates**: Failure rates and types
- **Quality metrics**: Response relevance, accuracy

## Security Considerations

### Input Validation

- Validate all user inputs before sending to LLM
- Sanitize prompts to remove injection attempts
- Limit prompt length to prevent DoS
- Implement rate limiting per user

### Output Validation

- Validate structured outputs against schemas
- Sanitize outputs before rendering in UI
- Check for sensitive data leakage
- Implement content filtering

### API Key Management

- Never hardcode API keys
- Use environment variables or secret managers
- Rotate keys regularly
- Implement key scoping

## Common Patterns

### Chain of Thought

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "system",
        "content": "Think step by step. Show your reasoning before the final answer."
    }, {
        "role": "user",
        "content": "Solve this complex problem"
    }]
)
```

### Few-Shot Learning

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{
        "role": "system",
        "content": "Here are examples of the task:\n\nExample 1:\nInput: ...\nOutput: ...\n\nExample 2:\nInput: ...\nOutput: ..."
    }, {
        "role": "user",
        "content": "Now solve this: ..."
    }]
)
```

### Tool Use Pattern

```python
tools = [
    {"type": "code_interpreter"},
    {"type": "file_search"},
    {"type": "function", "function": {...}}
]

response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[...],
    tools=tools
)
```

## Testing AI Features

### Unit Testing

```python
def test_structured_output():
    schema = Product.model_json_schema()
    response = mock_llm_response('{"name": "Test", "price": 10.0, "in_stock": true}')
    product = Product.model_validate_json(response)
    assert product.name == "Test"
```

### Integration Testing

```python
def test_rag_pipeline():
    collection.add_documents(["Paris is the capital of France"])
    result = query_rag("What is the capital of France?")
    assert "Paris" in result
```

### Evaluation

- Use evaluation datasets to measure accuracy
- Implement A/B testing for prompt variations
- Track user satisfaction metrics
- Monitor for drift over time

## Resources

### Documentation

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com)
- [Google Gemini Documentation](https://ai.google.dev/docs)

### Libraries

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [LangChain](https://python.langchain.com)
- [LlamaIndex](https://docs.llamaindex.ai)

### Tools

- [Instructor](https://instructor-ai.github.io/instructor/)
- [Outlines](https://github.com/outlines-dev/outlines)
- [Weave](https://wandb.ai/weave)
