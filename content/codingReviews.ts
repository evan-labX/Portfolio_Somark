export interface CodingReviewExample {
  id: string
  title: string
  reviewType: string
  category: string
  description: string
  diagramType: string
  prompt: string
  projectContext?: string
  submittedCode: string
  codeLanguage: 'python' | 'typescript' | 'tsx'
  rubric: { category: string; score: string }[]
  overallScore: string
  strengths: string[]
  issues: string[]
  improvedVersion: string
  finalReview: string
}

export const codingReviewsSection = {
  title: 'Coding Evaluation Examples',
  overview:
    'I review code for correctness, reliability, security, maintainability, and production readiness. These examples show how I evaluate AI-generated or candidate-written code using structured feedback, scorecards, and concrete improvements.',
  caption:
    'Sample coding-review artifacts showing how I evaluate AI-generated code for correctness, reliability, security, and production readiness.',
  items: [
    {
      id: 'python-api',
      title: 'Python API Reliability Review',
      reviewType: 'Python code review, API reliability, error handling, production readiness',
      category: 'Python / API',
      description: 'Review a Python function that fetches JSON from an external API for production readiness.',
      diagramType: 'cr-python-api',
      prompt: 'Review this Python function that fetches JSON data from an external API.',
      submittedCode: `import requests

def fetch_data(url):
    response = requests.get(url)
    return response.json()`,
      codeLanguage: 'python' as const,
      rubric: [
        { category: 'Correctness', score: '6/10' },
        { category: 'Reliability', score: '3/10' },
        { category: 'Security', score: '5/10' },
        { category: 'Error Handling', score: '2/10' },
        { category: 'Production Readiness', score: '3/10' },
      ],
      overallScore: '4/10',
      strengths: [
        'The code is simple and works for a happy-path API call when the server returns valid JSON quickly.',
      ],
      issues: [
        'No timeout, so the request can hang indefinitely.',
        'No HTTP status validation.',
        'No handling for network failures.',
        'No handling for invalid JSON responses.',
        'No input validation for URL safety.',
        'No logging or structured error context.',
      ],
      improvedVersion: `import requests
from requests.exceptions import RequestException, JSONDecodeError

def fetch_data(url: str, timeout: int = 10) -> dict:
    if not url.startswith(("https://", "http://")):
        raise ValueError("URL must start with http:// or https://")

    try:
        response = requests.get(url, timeout=timeout)
        response.raise_for_status()
        return response.json()
    except JSONDecodeError as exc:
        raise ValueError("API returned invalid JSON") from exc
    except RequestException as exc:
        raise RuntimeError(f"API request failed: {exc}") from exc`,
      finalReview:
        'The original code is acceptable for a quick local script, but not for production. The improved version adds timeout protection, HTTP error handling, invalid JSON handling, and basic URL validation. A stronger production version would also add retries, logging, rate-limit handling, and optional response schema validation.',
    },
    {
      id: 'fastapi-endpoint',
      title: 'FastAPI Endpoint Review',
      reviewType: 'Backend API review, FastAPI, input validation, error handling, response design',
      category: 'FastAPI',
      description: 'Review a FastAPI endpoint that resolves free-text oil well names into official API numbers.',
      diagramType: 'cr-fastapi-resolver',
      prompt: 'Review this FastAPI endpoint that resolves a free-text oil well name into an official API number.',
      projectContext:
        'Relevant to API-heavy projects like an oil-well resolver, RAG service, or document-processing backend.',
      submittedCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/resolve")
def resolve_well(name: str):
    result = search_database(name)
    if result:
        return result

    llm_result = ask_llm(name)
    return {"api_number": llm_result}`,
      codeLanguage: 'python' as const,
      rubric: [
        { category: 'Correctness', score: '6/10' },
        { category: 'API Design', score: '5/10' },
        { category: 'Reliability', score: '4/10' },
        { category: 'Data Validation', score: '3/10' },
        { category: 'Production Readiness', score: '4/10' },
      ],
      overallScore: '4.5/10',
      strengths: [
        'The endpoint has a reasonable fallback structure: first search deterministic data, then use an LLM only when the database does not return a result.',
      ],
      issues: [
        'No validation on name.',
        'No confidence score from the database match.',
        'No distinction between exact match, fuzzy match, and LLM fallback.',
        'No timeout or failure handling around the LLM call.',
        'No audit trail showing why a result was selected.',
        'No response schema.',
        'No handling for ambiguous matches.',
        'The LLM result is returned directly, which is risky for official identifiers.',
      ],
      improvedVersion: `from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Literal, Optional

app = FastAPI()

class ResolveResponse(BaseModel):
    api_number: Optional[str]
    confidence: float
    source: Literal["exact_match", "fuzzy_match", "llm_fallback", "not_found"]
    explanation: str

@app.get("/resolve", response_model=ResolveResponse)
def resolve_well(
    name: str = Query(..., min_length=3, max_length=200)
):
    exact = search_exact_match(name)
    if exact:
        return ResolveResponse(
            api_number=exact.api_number,
            confidence=1.0,
            source="exact_match",
            explanation="Exact database match found."
        )

    fuzzy = search_fuzzy_match(name)
    if fuzzy and fuzzy.confidence >= 0.90:
        return ResolveResponse(
            api_number=fuzzy.api_number,
            confidence=fuzzy.confidence,
            source="fuzzy_match",
            explanation="High-confidence fuzzy match found."
        )

    llm_result = ask_llm_with_timeout(name)

    if not llm_result or llm_result.confidence < 0.85:
        return ResolveResponse(
            api_number=None,
            confidence=0.0,
            source="not_found",
            explanation="No reliable match found."
        )

    return ResolveResponse(
        api_number=llm_result.api_number,
        confidence=llm_result.confidence,
        source="llm_fallback",
        explanation="LLM fallback used after deterministic search failed."
    )`,
      finalReview:
        'The original endpoint has a good high-level idea but lacks the controls needed for a production resolver. The improved version adds validation, confidence scoring, typed responses, safer fallback logic, and clearer auditability. For official identifiers, the LLM should assist ranking or tie-breaking, not act as the sole source of truth.',
    },
    {
      id: 'zod-llm-validation',
      title: 'TypeScript + Zod LLM Output Validation',
      reviewType: 'TypeScript review, LLM systems, schema validation, safe parsing, agent reliability',
      category: 'TypeScript / Zod',
      description: 'Review TypeScript that asks an LLM for structured JSON and validates the result with Zod.',
      diagramType: 'cr-zod-validation',
      prompt: 'Review this TypeScript function that asks an LLM for structured JSON and validates the result.',
      projectContext:
        'Directly relevant to LLM agent systems, structured outputs, MCP-style tools, and model orchestration.',
      submittedCode: `import { z } from "zod";

const ResultSchema = z.object({
  answer: z.string(),
  confidence: z.number(),
});

async function runModel(prompt: string) {
  const raw = await callLLM(prompt);
  const parsed = JSON.parse(raw);
  return ResultSchema.parse(parsed);
}`,
      codeLanguage: 'typescript' as const,
      rubric: [
        { category: 'Correctness', score: '7/10' },
        { category: 'Reliability', score: '4/10' },
        { category: 'Type Safety', score: '7/10' },
        { category: 'Failure Handling', score: '3/10' },
        { category: 'LLM Production Readiness', score: '4/10' },
      ],
      overallScore: '5/10',
      strengths: [
        'The code uses a Zod schema, which is a strong choice for validating LLM outputs. The expected output shape is simple and clear.',
      ],
      issues: [
        'JSON.parse() can throw and crash the call.',
        'ResultSchema.parse() can throw and is not handled.',
        'No timeout on the model call.',
        'No retry or fallback if the model returns malformed JSON.',
        'confidence is not bounded between 0 and 1.',
        'No logging of malformed output.',
        'No distinction between model failure and validation failure.',
      ],
      improvedVersion: `import { z } from "zod";

const ResultSchema = z.object({
  answer: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

type Result = z.infer<typeof ResultSchema>;

async function runModel(prompt: string): Promise<Result> {
  const raw = await callLLMWithTimeout(prompt, 15_000);

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Model returned non-JSON output");
  }

  const validation = ResultSchema.safeParse(parsed);

  if (!validation.success) {
    logValidationFailure({
      prompt,
      raw,
      issues: validation.error.issues,
    });

    throw new Error("Model output failed schema validation");
  }

  return validation.data;
}`,
      finalReview:
        'The original code has the right idea but is fragile. In production LLM systems, validation failures should be expected, not treated as rare exceptions. The improved version adds safe parsing, confidence bounds, timeout protection, structured validation handling, and logging for debugging model behavior.',
    },
    {
      id: 'rag-retrieval',
      title: 'RAG Retrieval Logic Review',
      reviewType: 'RAG system review, retrieval quality, ranking, metadata filtering, hallucination prevention',
      category: 'RAG / Retrieval',
      description: 'Review a retrieval function used before sending context to an LLM in an enterprise RAG system.',
      diagramType: 'cr-rag-retrieval',
      prompt: 'Review this retrieval function used before sending context to an LLM.',
      projectContext:
        'Relevant to RAG platforms, enterprise search, document QA, and AI answer evaluation.',
      submittedCode: `def retrieve_context(query, user_id):
    docs = vector_db.search(query, top_k=5)
    return "\\n".join([doc.text for doc in docs])`,
      codeLanguage: 'python' as const,
      rubric: [
        { category: 'Correctness', score: '5/10' },
        { category: 'Security', score: '3/10' },
        { category: 'Retrieval Quality', score: '4/10' },
        { category: 'Enterprise Readiness', score: '3/10' },
        { category: 'Hallucination Risk Control', score: '4/10' },
      ],
      overallScore: '3.8/10',
      strengths: ['The function performs basic semantic retrieval and returns context to the model.'],
      issues: [
        'user_id is unused.',
        'No permission-aware filtering.',
        'No metadata filtering.',
        'No reranking step.',
        'No score threshold.',
        'No source attribution.',
        'No handling for irrelevant retrieval results.',
        'No token budget control.',
        'No deduplication.',
        'No protection against stale or conflicting documents.',
      ],
      improvedVersion: `def retrieve_context(query: str, user_id: str, top_k: int = 8) -> list[dict]:
    allowed_sources = get_user_allowed_sources(user_id)

    candidates = vector_db.search(
        query=query,
        top_k=top_k * 3,
        filters={"source_id": {"$in": allowed_sources}},
    )

    reranked = rerank_results(query, candidates)

    selected = []
    seen_doc_ids = set()

    for doc in reranked:
        if doc.score < 0.72:
            continue

        if doc.doc_id in seen_doc_ids:
            continue

        selected.append({
            "text": truncate_to_token_budget(doc.text, max_tokens=500),
            "source": doc.source,
            "doc_id": doc.doc_id,
            "score": doc.score,
            "updated_at": doc.updated_at,
        })

        seen_doc_ids.add(doc.doc_id)

        if len(selected) >= top_k:
            break

    return selected`,
      finalReview:
        'The original function is too basic for any RAG system involving private or enterprise data. The improved version adds permission filtering, reranking, score thresholds, deduplication, source tracking, and token budget control. These controls reduce hallucination risk and make the generated answer easier to audit.',
    },
    {
      id: 'agent-tool',
      title: 'AI-Agent Tool Execution Review',
      reviewType: 'Agent safety review, tool-calling reliability, guardrails, execution control',
      category: 'Agent / Tools',
      description: 'Review a tool-execution function used by an AI agent for safety and reliability.',
      diagramType: 'cr-agent-tool',
      prompt: 'Review this tool-execution function used by an AI agent.',
      projectContext:
        'Relevant to AI coding agents, MCP tools, local automation agents, and LLM workflow systems.',
      submittedCode: `async function runTool(toolName: string, args: any) {
  const tool = tools[toolName];
  return await tool(args);
}`,
      codeLanguage: 'typescript' as const,
      rubric: [
        { category: 'Correctness', score: '5/10' },
        { category: 'Safety', score: '2/10' },
        { category: 'Reliability', score: '3/10' },
        { category: 'Type Safety', score: '2/10' },
        { category: 'Agent Readiness', score: '3/10' },
      ],
      overallScore: '3/10',
      strengths: ['The function captures the basic concept of routing an agent tool call by name.'],
      issues: [
        'No check that the tool exists.',
        'args: any removes type safety.',
        'No schema validation per tool.',
        'No permission control.',
        'No timeout.',
        'No logging.',
        'No error boundary.',
        'No allowlist or policy layer.',
        'No protection against destructive tool calls.',
      ],
      improvedVersion: `import { z } from "zod";

type ToolDefinition<TInput, TOutput> = {
  name: string;
  schema: z.ZodType<TInput>;
  requiresApproval?: boolean;
  execute: (args: TInput) => Promise<TOutput>;
};

async function runTool<TInput, TOutput>(
  toolName: string,
  rawArgs: unknown,
  userApproved: boolean
): Promise<TOutput> {
  const tool = tools[toolName] as ToolDefinition<TInput, TOutput> | undefined;

  if (!tool) {
    throw new Error(\`Unknown tool: \${toolName}\`);
  }

  if (tool.requiresApproval && !userApproved) {
    throw new Error(\`Tool requires user approval: \${toolName}\`);
  }

  const parsedArgs = tool.schema.parse(rawArgs);

  try {
    return await withTimeout(
      tool.execute(parsedArgs),
      15_000
    );
  } catch (error) {
    logToolFailure({ toolName, error });
    throw error;
  }
}`,
      finalReview:
        'The original version is a useful prototype but unsafe for an AI agent that can call real tools. The improved version adds tool existence checks, schema validation, approval gating, timeout control, and failure logging. These are core controls for dependable agent workflows.',
    },
    {
      id: 'react-component',
      title: 'React / Next.js Component Review',
      reviewType: 'Frontend review, React rendering, performance, accessibility, TypeScript',
      category: 'React / Next.js',
      description: 'Review a React component that renders a list of articles for production quality.',
      diagramType: 'cr-react-component',
      prompt: 'Review this React component that renders a list of articles.',
      projectContext:
        'Relevant to content platforms, dashboards, admin panels, and user-facing web applications.',
      submittedCode: `export default function ArticleList({ articles }) {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} onClick={() => window.location.href = article.url}>
          <img src={article.image} />
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}`,
      codeLanguage: 'tsx' as const,
      rubric: [
        { category: 'Correctness', score: '6/10' },
        { category: 'Type Safety', score: '3/10' },
        { category: 'Accessibility', score: '3/10' },
        { category: 'Performance', score: '5/10' },
        { category: 'Maintainability', score: '5/10' },
      ],
      overallScore: '4.5/10',
      strengths: ['The component is simple and likely renders correctly for basic article lists.'],
      issues: [
        'No TypeScript interface for props.',
        'Uses array index as key.',
        'Clickable div hurts accessibility.',
        'Image has no alt text.',
        'Direct window.location.href is not ideal in Next.js.',
        'No fallback for missing image or description.',
        'No layout or loading optimization.',
        'No keyboard support.',
      ],
      improvedVersion: `import Link from "next/link";
import Image from "next/image";

type Article = {
  id: string;
  url: string;
  image: string;
  title: string;
  description?: string;
};

type ArticleListProps = {
  articles: Article[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <section aria-label="Article list">
      {articles.map((article) => (
        <article key={article.id}>
          <Link href={article.url}>
            <Image
              src={article.image}
              alt={article.title}
              width={320}
              height={180}
            />
            <h2>{article.title}</h2>
            {article.description && <p>{article.description}</p>}
          </Link>
        </article>
      ))}
    </section>
  );
}`,
      finalReview:
        'The original component works at a basic level but misses important production concerns. The improved version adds type safety, stable keys, accessibility, Next.js routing, image optimization, and safer optional rendering.',
    },
    {
      id: 'sql-pipeline',
      title: 'SQL / Data Pipeline Review',
      reviewType: 'SQL review, data correctness, injection risk, pagination, analytics reliability',
      category: 'SQL / Data',
      description: 'Review a function that retrieves recent price records from a database.',
      diagramType: 'cr-sql-pipeline',
      prompt: 'Review this function that retrieves recent records from a database.',
      projectContext:
        'Relevant to data platforms, dashboards, trading systems, finance pipelines, and time-series applications.',
      submittedCode: `def get_recent_prices(symbol):
    query = f"SELECT * FROM prices WHERE symbol = '{symbol}' ORDER BY time DESC"
    return db.execute(query).fetchall()`,
      codeLanguage: 'python' as const,
      rubric: [
        { category: 'Correctness', score: '5/10' },
        { category: 'Security', score: '2/10' },
        { category: 'Performance', score: '3/10' },
        { category: 'Data Reliability', score: '4/10' },
        { category: 'Production Readiness', score: '3/10' },
      ],
      overallScore: '3.4/10',
      strengths: [
        'The query expresses the intended logic: retrieve recent price records for a symbol ordered by time.',
      ],
      issues: [
        'SQL injection risk from string interpolation.',
        'No limit or pagination.',
        'SELECT * may fetch unnecessary columns.',
        'No validation of symbol.',
        'No time range filter.',
        'No handling for empty results.',
        'Query may become slow without an index on (symbol, time).',
        'No clear return shape.',
      ],
      improvedVersion: `def get_recent_prices(symbol: str, limit: int = 500):
    if not symbol.isalnum() or len(symbol) > 12:
        raise ValueError("Invalid symbol")

    query = """
        SELECT symbol, time, open, high, low, close, volume
        FROM prices
        WHERE symbol = %s
        ORDER BY time DESC
        LIMIT %s
    """

    return db.execute(query, (symbol.upper(), limit)).fetchall()`,
      finalReview:
        'The original code is unsafe and could become expensive at scale. The improved version uses parameterized SQL, validates input, limits the result set, avoids SELECT *, and returns only the needed columns. A production system should also add indexing, pagination, observability, and tests for edge cases.',
    },
  ] satisfies CodingReviewExample[],
}
