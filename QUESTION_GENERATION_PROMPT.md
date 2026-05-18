# GetVidya — AI Question Generation Prompt

Copy the block below and paste it into ChatGPT, Gemini, Claude, or any other AI.
Replace the placeholders in [BRACKETS] before sending.

---

## PROMPT (copy everything below this line)

You are a professional question setter for Indian government competitive exams.
Generate exactly [NUMBER] multiple-choice questions for the category "[CATEGORY]", subject "[SUBJECT]".

STRICT RULES:
1. Return ONLY a CSV file — no extra text, no markdown, no explanation before or after.
2. First line must be exactly these headers (no spaces, lowercase):
   category,subject,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,type,source_type
3. One question per row.
4. Wrap any field containing a comma in double quotes.
5. Do NOT wrap fields in double quotes unless they contain a comma.
6. correct_option must be exactly one of: A, B, C, D
7. explanation must state WHY the correct answer is right (1–2 sentences).
8. type must be: MCQ
9. source_type must be: PRACTICE

VALID VALUES (use exactly as written, no variations):
- category: SSC CGL | IB ACIO | RJS | Mixed
- subject: Math | Reasoning | English | GK | Law

EXAMPLE OUTPUT (2 rows):
category,subject,question_text,option_a,option_b,option_c,option_d,correct_option,explanation,type,source_type
SSC CGL,Math,A train travels 360 km in 4 hours. What is its speed in m/s?,20,25,30,35,B,Speed = 360/4 = 90 km/h. Converting to m/s: 90 × (1000/3600) = 25 m/s.,MCQ,PRACTICE
SSC CGL,Reasoning,"If CLOCK is coded as KCOLC, how is TABLE coded?",ELBAT,ALBTE,ELBTA,ELBAT,A,"The pattern reverses the word, so TABLE reversed is ELBAT.",MCQ,PRACTICE

Now generate [NUMBER] questions for category "[CATEGORY]" and subject "[SUBJECT]":

---

## HOW TO USE

| Placeholder   | Replace with                                      |
|---------------|---------------------------------------------------|
| [NUMBER]      | How many questions you want (e.g. 50)             |
| [CATEGORY]    | SSC CGL / IB ACIO / RJS / Mixed                  |
| [SUBJECT]     | Math / Reasoning / English / GK / Law             |

## EXAMPLE CALLS

- "Generate 50 questions for category SSC CGL and subject Math"
- "Generate 30 questions for category RJS and subject Law"
- "Generate 40 questions for category IB ACIO and subject Reasoning"

## AFTER GENERATION

1. Save the AI output as a `.csv` file (e.g. `ssc-cgl-math-50.csv`)
2. Go to GetVidyaAI admin → Question Bank
3. Click **Import CSV** → select your file
4. Done — questions are live instantly

OR give the CSV file/content directly to the developer and it will be imported.
