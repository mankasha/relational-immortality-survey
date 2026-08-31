import { promises as fs } from "fs";
import path from "path";
import type { SurveyResponse } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "responses");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function saveResponse(response: SurveyResponse): Promise<void> {
  await ensureDataDir();
  const filename = `${response.participantId}.json`;
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(response, null, 2),
    "utf-8"
  );
}

export async function loadAllResponses(): Promise<SurveyResponse[]> {
  try {
    await ensureDataDir();
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const responses: SurveyResponse[] = [];
    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
      responses.push(JSON.parse(content) as SurveyResponse);
    }
    return responses.sort(
      (a, b) =>
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
    );
  } catch {
    return [];
  }
}

export function flattenForCsv(response: SurveyResponse): Record<string, string> {
  const row: Record<string, string> = {
    participant_id: response.participantId,
    started_at: response.startedAt,
    completed_at: response.completedAt,
    is_test_response: String(response.isTestResponse ?? false),
  };

  for (const [key, value] of Object.entries(response.randomization)) {
    if (Array.isArray(value)) {
      row[`rand_${key}`] = value.join("|");
    } else if (typeof value === "object" && value !== null) {
      row[`rand_${key}`] = JSON.stringify(value);
    } else {
      row[`rand_${key}`] = String(value);
    }
  }

  for (const [key, value] of Object.entries(response.answers)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "object") {
      row[`ans_${key}`] = JSON.stringify(value);
    } else {
      row[`ans_${key}`] = String(value);
    }
  }

  for (const [key, value] of Object.entries(response.derived)) {
    if (value !== undefined) {
      row[`derived_${key}`] = String(value);
    }
  }

  return row;
}

export function responsesToCsv(responses: SurveyResponse[]): string {
  if (responses.length === 0) return "participant_id\n";

  const rows = responses.map(flattenForCsv);
  const allKeys = new Set<string>();
  rows.forEach((row) => Object.keys(row).forEach((k) => allKeys.add(k)));
  const headers = Array.from(allKeys).sort();

  const escape = (val: string) => {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];
  return lines.join("\n");
}
