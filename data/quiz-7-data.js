/* =========================================================
   AI-103 Quiz 7 — 32 câu hỏi (Microsoft Foundry agent scenarios)
   Biên soạn theo các chủ đề/khái niệm kỹ thuật thường gặp trong đề thi
   AI-103 — tình huống và lời văn tự viết, không sao chép từ nguồn nào.
   type: single | multi | tf | match | order | fill
   ========================================================= */
const quizData = [
{id:1, type:"fill", text:"A retail company runs a customer support agent whose model deployment must: dynamically scale for variable traffic without reserved throughput, keep data within the EU, and use a consistent model version for stable responses. How should you configure the deployment?",
 blanks:[
  {prefix:"Set Deployment type to", options:["Standard","Global Standard","Global Provisioned"], correct:"Standard", suffix:","},
  {prefix:"and set Version update policy to", options:["Once the current version expires","Opt out of automatic model version upgrades","Upgrade once a new default version becomes available"], correct:"Once the current version expires", suffix:"."}
 ],
 explain:"Standard deployment hỗ trợ scale linh hoạt theo traffic mà không cần đặt trước throughput (khác với Provisioned cần mua PTU cố định), và không định tuyến toàn cầu như Global (vốn có thể vi phạm yêu cầu dữ liệu ở lại EU). 'Once the current version expires' giữ model ổn định lâu nhất có thể trong khi vẫn đảm bảo tuân thủ khi Microsoft bắt buộc nâng cấp — khác với 'opt out' (không thể từ chối vĩnh viễn khi version bị retire) hay 'upgrade ngay khi có version mới' (có thể phá vỡ tính nhất quán response bất cứ lúc nào)."},

{id:2, type:"single", text:"An agent that processes customer support documents accepts images that may contain embedded text with hidden malicious instructions. The company also requires that customer data never be revealed even if accidentally included in the knowledge source. Which control should you configure to address both risks?",
 options:["Self-harm content filtering","Prompt shields","Personally identifiable information (PII) detection","Violence content filtering"],
 correct:1,
 explain:"Prompt shields được thiết kế để phát hiện và chặn instruction độc hại nhúng trong nội dung bên thứ ba (kể cả trong ảnh), giúp bảo vệ agent khỏi bị thao túng và giảm nguy cơ tiết lộ dữ liệu nhạy cảm do bị đánh lừa. Self-harm/violence content filtering chỉ lọc loại nội dung có hại cụ thể, không liên quan tới việc phát hiện injection. PII detection chỉ nhận diện thông tin cá nhân sau khi đã xuất hiện, mang tính phát hiện hơn là ngăn chặn chủ động."},

{id:3, type:"single", text:"A Foundry project will contain multiple agents that all need to query the same Azure AI Search resource. You need a way to manage the search credentials centrally so every agent in the project can reuse them without duplicating configuration. What should you do?",
 options:["Enable role-based access control (RBAC) for the Azure AI Search resource","Disable key-based access control on the Azure AI Search resource","Add a connection to the Azure AI Search resource","Create a managed private endpoint that connects to the Azure AI Search resource"],
 correct:2,
 explain:"Thêm 1 connection tới Azure AI Search resource ngay trong project cho phép mọi agent tham chiếu chung 1 cấu hình, tránh trùng lặp và đơn giản hoá việc cập nhật credential sau này. RBAC chỉ định nghĩa quyền hành động, không tập trung hoá connection; tắt key-based access chỉ đổi cách xác thực chứ không tạo ra cấu hình dùng chung; managed private endpoint chỉ giải quyết vấn đề kết nối mạng an toàn, không phải quản lý credential tập trung."},

{id:4, type:"tf", text:"A team runs two telemetry sources into the same Application Insights resource: the Foundry Agent Service (via configure_azure_monitor) and a separate LangChain service using OpenTelemetry with enable_content_recording=False. Evaluate each statement.",
 statements:[
  {text:"The LangChain service will automatically appear in the Traces tab without configuring any tracer.", answer:false},
  {text:"Setting different OTEL_SERVICE_NAME values for each service allows them to be distinguished within the same Application Insights resource.", answer:true},
  {text:"With enable_content_recording=False, prompts and tool call data will still be captured in the telemetry.", answer:false}
 ],
 explain:"1 sai: LangChain cần được gắn tracer OpenTelemetry rõ ràng (như AzureAIOpenTelemetryTracer) trước khi bất kỳ trace nào được gửi đi — không tự động xuất hiện. 2 đúng: OTEL_SERVICE_NAME là tên logic của service trong dữ liệu telemetry, đặt khác nhau giúp Application Insights phân biệt được các service dù dùng chung 1 resource. 3 sai: enable_content_recording=False chủ động loại bỏ nội dung thực của prompt/tool data khỏi telemetry để bảo vệ thông tin nhạy cảm."},

{id:5, type:"match", text:"You are implementing two Content Understanding pipelines for processing insurance claim documents: Pipeline1 must process standalone claim PDFs cheaply at high volume, and Pipeline2 must cross-reference multiple related claim documents using multi-step reasoning. Match each pipeline to its configuration.",
 rows:[
  {desc:"Pipeline1 — cost-effective, high-volume processing of standalone documents.", correct:"Single-file task in standard mode"},
  {desc:"Pipeline2 — cross-document validation using multi-step reasoning and reference data.", correct:"Multi-file task in pro mode"}
 ],
 pool:["Single-file task in standard mode","Multi-file task in pro mode","Multi-file task in standard mode","Single-file task in pro mode"],
 explain:"Standard mode xử lý từng file độc lập với chi phí thấp — phù hợp khối lượng lớn tài liệu đơn lẻ. Pro mode hỗ trợ reasoning nâng cao và xử lý nhiều file liên quan cùng lúc — cần thiết khi phải đối chiếu chéo giữa các tài liệu. Multi-file standard thiếu khả năng reasoning nâng cao; single-file pro chỉ xử lý được 1 file/lần nên không đối chiếu chéo được."},

{id:6, type:"fill", text:"A Python application must authenticate to a Microsoft Foundry project by using a Microsoft Entra managed identity and send prompts through the Azure OpenAI Responses API.",
 blanks:[
  {prefix:"The credential object should be created by calling", options:["DefaultAzureCredential()","AzureKeyCredential()","ClientSecretCredential()"], correct:"DefaultAzureCredential()", suffix:","},
  {prefix:"and the call to submit a prompt should use", options:["openai_client.responses.create(...)","openai_client.responses.retrieve(...)","openai_client.responses.compact(...)"], correct:"openai_client.responses.create(...)", suffix:"."}
 ],
 explain:"DefaultAzureCredential tự động dùng managed identity (hoặc các nguồn xác thực Azure khác) mà không cần hardcode secret — đúng yêu cầu xác thực bằng Entra managed identity. Method 'create' trên responses là cách chuẩn để gửi prompt và nhận completion qua Responses API. AzureKeyCredential/ClientSecretCredential không phải managed identity; 'retrieve' chỉ lấy lại 1 response đã tồn tại, 'compact' không phải method hợp lệ của Responses API."},

{id:7, type:"fill", text:"A workflow's Ask a question node stores the user's reply in a local variable named Var01. You need a Power Fx if/else condition that is true only when Var01 actually has a value, and a Send message expression that echoes the value in uppercase.",
 blanks:[
  {prefix:"The if/else condition should be", options:["Not(IsBlank(Local.Var01))","IsBlank(Local.Var01)","IsEmpty(Local.Var01)"], correct:"Not(IsBlank(Local.Var01))", suffix:","},
  {prefix:"and the Send message expression should be", options:["{Upper(Local.Var01)}","{Local.Var01}","{Upper(Var01)}"], correct:"{Upper(Local.Var01)}", suffix:"."}
 ],
 explain:"IsBlank trả về true khi biến RỖNG, nên phải bọc trong Not() để biểu thức chỉ đúng khi biến CÓ giá trị. Upper(Local.Var01) trong dấu ngoặc nhọn (string interpolation) chuyển giá trị biến local sang chữ hoa để hiển thị. IsEmpty dùng cho collection/table chứ không phải biến text; bỏ Not() sẽ cho kết quả ngược lại yêu cầu; bỏ tiền tố Local. sẽ tham chiếu sai biến."},

{id:8, type:"fill", text:"A customer support agent uploads user-provided screenshots to Blob Storage and later reasons over them via a blob URL. You need to enable image moderation across every interaction touchpoint and block violations, while granting Content Safety only the minimum access needed to read the blob.",
 blanks:[
  {prefix:"Set the guardrail scope to cover", options:["User input, Output, Tool response, and Tool call — with Action set to Block","only User input — with Action set to Annotate","only Output — with Action set to Block"], correct:"User input, Output, Tool response, and Tool call — with Action set to Block", suffix:","},
  {prefix:"and grant blob access via", options:["a system-assigned managed identity with the Storage Blob Data Reader role","storage account access keys","a system-assigned managed identity with the Storage Blob Data Contributor role"], correct:"a system-assigned managed identity with the Storage Blob Data Reader role", suffix:"."}
 ],
 explain:"Để chặn nội dung có hại ở MỌI điểm chạm (input, output, tool response, tool call), cần chọn đủ cả 4 phạm vi và đặt Action=Block — chỉ chọn 1 phần sẽ để lọt các điểm còn lại. Storage Blob Data Reader (qua managed identity hệ thống) cấp đúng quyền đọc cần thiết mà không cấp thêm quyền ghi/xoá — đúng nguyên tắc least privilege. Storage account keys là bí mật tĩnh cần quản lý thủ công, không tuân theo identity-based access; Contributor role cấp dư quyền ghi/xoá không cần thiết."},

{id:9, type:"single", text:"Three specialized agents (triage, policy lookup, ticket action) must work together in a deterministic, step-based process with conditional branching and shared state between steps, optionally invoking a ticket action based on the triage result — while minimizing development effort. What should you use to orchestrate them?",
 options:["A workflow","Threads and runs coordinated entirely in application code","A multi-agent group chat session","Separate agent runs manually synchronized in the application"],
 correct:0,
 explain:"Workflow hỗ trợ sẵn: chuỗi bước xác định, điều kiện rẽ nhánh, và chia sẻ state giữa các bước — mà không cần viết logic điều phối riêng, đúng yêu cầu tối thiểu công sức. Threads/runs tự viết code hay tự đồng bộ agent run riêng lẻ đòi hỏi xây dựng thủ công toàn bộ shared state/branching logic; group chat phù hợp cho hội thoại linh hoạt giữa các agent hơn là quy trình nghiệp vụ có thứ tự xác định trước."},

{id:10, type:"single", text:"An agent calls the Speech to Text REST API using a fine-tuned custom model published for the en-US locale, and the API returns an error that the project ID is invalid. What should you set the project property to?",
 options:["The project URL","The custom speech project ID","The Microsoft Foundry project ID","The custom speech endpoint URL"],
 correct:1,
 explain:"Custom speech project ID là định danh riêng được tạo khi fine-tune và publish model — API cần đúng ID này để định tuyến request tới model tuỳ chỉnh chính xác. Project URL/endpoint URL chỉ trỏ tới địa chỉ dịch vụ, không phải ID; Microsoft Foundry project ID là ID khác (thuộc Foundry, không phải Custom Speech), dùng nhầm sẽ vẫn báo lỗi invalid."},

{id:11, type:"fill", text:"An agent named PaymentAgent can issue refunds via a function tool calling an external API. You are writing the workflow in YAML and need it to pause for human approval before the refund step executes, continuing only once approval is granted.",
 blanks:[
  {prefix:"The approval step's type should be", options:["ask_question","basic_chat","data_transformation"], correct:"ask_question", suffix:","},
  {prefix:"and the refund step's condition should be", options:["approval == \"approved\"","propose_refund.output != null","true"], correct:"approval == \"approved\"", suffix:"."}
 ],
 explain:"ask_question tạm dừng workflow để chờ phản hồi từ người dùng/người duyệt — đúng cơ chế human-in-the-loop cần thiết. Điều kiện approval == \"approved\" đảm bảo bước refund chỉ chạy khi output của bước approval đúng bằng giá trị 'approved'. basic_chat/data_transformation không tạo điểm dừng chờ duyệt; kiểm tra output khác null chỉ xác nhận có phản hồi (không chắc đã được duyệt); điều kiện luôn true sẽ cho refund chạy dù chưa duyệt."},

{id:12, type:"single", text:"A custom speech-to-text model deployed to a custom endpoint is approaching its expiration date. What is the expected behavior once it expires?",
 options:["Speech recognition requests return a 4xx error until a new custom model is deployed","Speech recognition requests continue using the expired model until it is removed manually","Speech recognition requests fall back to the most recent base model for the same locale","The custom model is deleted automatically when it expires"],
 correct:2,
 explain:"Khi model custom hết hạn, dịch vụ tự động fallback về base model mới nhất cùng locale để duy trì tính liên tục của dịch vụ, tránh gián đoạn hoàn toàn. Nó không trả lỗi 4xx ngay lập tức, không tiếp tục dùng model đã hết hạn (rủi ro về hỗ trợ/độ chính xác), và không tự xoá model — hành vi ảnh hưởng chỉ là ở lượt request, không phải vòng đời lưu trữ."},

{id:13, type:"single", text:"Developers calling a Foundry model deployment through the Azure OpenAI v1 API with DefaultAzureCredential receive HTTP 403 errors even after signing in via the Azure CLI. You need to grant just enough permission for model inference, following least privilege. Which RBAC role should you assign?",
 options:["Cognitive Services User","Cognitive Services OpenAI User","Contributor","Cognitive Services Data Reader"],
 correct:1,
 explain:"Cognitive Services OpenAI User cấp đúng quyền cần thiết để gọi inference qua OpenAI API mà không cấp thêm quyền thừa. Cognitive Services User mang tính chung chung, có thể không đủ cụ thể cho OpenAI inference; Contributor cấp quyền quản lý resource vượt xa nhu cầu; Cognitive Services Data Reader chỉ cho đọc dữ liệu, không cấp quyền thực thi inference."},

{id:14, type:"single", text:"An agent has a Model Context Protocol (MCP) tool that queries a knowledge base, but some runs answer directly from the base model without invoking the tool, producing ungrounded responses. Which run parameter should you set to force tool invocation on every run?",
 options:["tool_choice = \"required\"","tool_choice = \"auto\"","response_format = \"tool\"","tools = [mcp_tool]"],
 correct:0,
 explain:"tool_choice=\"required\" buộc model phải gọi ít nhất 1 tool trước khi trả lời cuối cùng — vì agent chỉ có MCP tool, điều này đảm bảo tool luôn được gọi. 'auto' để model tự quyết định (có thể bỏ qua tool, gây ra vấn đề đang gặp); response_format chỉ định dạng output, không ép gọi tool; khai báo 'tools' chỉ liệt kê tool khả dụng chứ không bắt buộc dùng."},

{id:15, type:"match", text:"After a recent update, a RAG-grounded agent has two issues: some answers are unsupported by the retrieved documents, and a few responses are flagged for policy violations. Match each issue to the observability signal that helps diagnose it.",
 rows:[
  {desc:"Some answers are unsupported by the retrieved documents.", correct:"Groundedness evaluation metrics"},
  {desc:"A few responses are flagged for policy violations.", correct:"Risk and safety metrics"}
 ],
 pool:["Groundedness evaluation metrics","Risk and safety metrics","Latency breakdown traces","Token usage analytics"],
 explain:"Groundedness evaluation metrics đo mức độ câu trả lời được hỗ trợ bởi tài liệu truy xuất — phát hiện hallucination/unsupported answer. Risk and safety metrics đánh giá nội dung có hại/vi phạm chính sách. Latency traces chỉ đo thời gian; token usage chỉ đo mức tiêu thụ — cả hai không liên quan tới chất lượng hay tuân thủ nội dung."},

{id:16, type:"single", text:"An agent uses an OpenAPI 3.0 tool to call an external weather service that requires a key in an HTTP header. The key is stored as a connection in the project. You need the key to be included automatically every time the tool is invoked. What should you configure in the OpenAPI specification?",
 options:["A header parameter defined for each operation","An Azure Key Vault connection","An API key security scheme","A Bearer token security scheme"],
 correct:2,
 explain:"API key security scheme cho phép OpenAPI spec khai báo cách key được truyền (ví dụ trong header), để Foundry tự động lấy key từ connection và đính kèm mỗi lần gọi. Header parameter định nghĩa riêng cho từng operation gây trùng lặp/khó bảo trì; Key Vault connection không phải cơ chế gắn key vào request tự động ở đây (key đã nằm trong connection sẵn); Bearer token scheme dành cho OAuth/JWT, không phù hợp với API key đơn giản."},

{id:17, type:"single", text:"A high-volume chat app mostly receives simple FAQ questions, with a smaller share needing advanced reasoning. You need to reduce cost and latency for the common queries without degrading quality on the complex ones. What should you do?",
 options:["Route all requests to a smaller model","Use a model cascade that routes requests to different models based on complexity","Increase max_tokens for all requests","Route all requests to the most capable model"],
 correct:1,
 explain:"Model cascade định tuyến câu hỏi đơn giản tới model nhẹ (giảm cost/latency) và câu hỏi phức tạp tới model mạnh hơn (giữ chất lượng) — cân bằng cả 2 mục tiêu. Dùng 1 model nhỏ cho tất cả sẽ làm giảm chất lượng câu phức tạp; tăng max_tokens không giảm cost mà còn tăng; dùng model mạnh nhất cho tất cả sẽ tăng cost/latency không cần thiết cho câu đơn giản."},

{id:18, type:"fill", text:"An internal Q&A agent shows more 'no relevant information found' replies and periodic HTTP 429 errors during peak hours. You need to determine whether the cause is model unavailability, resource limits, or inference failures.",
 blanks:[
  {prefix:"Enable the metrics", options:["Model Availability Rate and Provisioned Utilization","Only Tokens Cache Match Rate","Only Total Requests filtered to status code 200"], correct:"Model Availability Rate and Provisioned Utilization", suffix:","},
  {prefix:"and collect the diagnostic log", options:["RequestResponse","AllMetrics","Audit"], correct:"RequestResponse", suffix:"."}
 ],
 explain:"Model Availability Rate cho biết model có sẵn sàng xử lý không (loại trừ nguyên nhân unavailability); Provisioned Utilization gần/vượt 100% giải thích lỗi 429 do giới hạn resource. RequestResponse log chứa chi tiết từng request/response (status code, latency, nội dung) để điều tra inference failure. Cache match rate chỉ đo hiệu quả cache; lọc chỉ status 200 bỏ sót các request lỗi cần xem; AllMetrics/Audit không đủ chi tiết ở cấp từng request."},

{id:19, type:"single", text:"A high-traffic agent's operational cost rose sharply after an update, while the volume of user traffic stayed the same. You suspect the request or response characteristics changed. You need to determine whether the added cost comes from input size, output size, or expanded tool usage. Which observability capability should you use?",
 options:["Latency","Evaluation metrics","Run success rate","Token usage"],
 correct:3,
 explain:"Token usage cho chi tiết số token input/output và token dùng cho tool call — cho phép xác định chính xác nguồn tăng chi phí dù traffic không đổi. Latency chỉ đo thời gian phản hồi; evaluation metrics đo chất lượng (groundedness, fluency...); run success rate chỉ báo thành công/thất bại — cả ba không giải thích được nguồn gốc chi phí tăng."},

{id:20, type:"fill", text:"You are publishing an agent for a compliance workflow. Requirements: every run must retrieve before responding; tool calls must authenticate using the agent's own identity, isolated from other project resources, with audit tracing support.",
 blanks:[
  {prefix:"Set tool_choice to", options:["required","auto","none"], correct:"required", suffix:","},
  {prefix:"and configure the tool to authenticate by using", options:["a distinct agent identity bound to the client application","the shared project agent identity","API keys stored in the prompt"], correct:"a distinct agent identity bound to the client application", suffix:"."}
 ],
 explain:"tool_choice=required đảm bảo bước retrieval luôn diễn ra trước khi trả lời. Distinct agent identity bound to the client application cung cấp identity riêng, cách ly khỏi resource khác trong project, và hỗ trợ audit trace theo từng request. 'auto' không đảm bảo retrieval; shared project identity không cách ly được như yêu cầu; lưu API key trong prompt vừa không an toàn vừa không cung cấp identity-based auth."},

{id:21, type:"single", text:"An agent's OpenAPI tool call to an external API returns HTTP 401, and traces show the API key header is not being sent, even though the key is already stored as a project connection. What should you do?",
 options:["Enable identity passthrough so the tool uses the caller's Microsoft Entra token","Add the API key header manually to the OpenAPI specification","Configure the tool to use the project's default connection","Connect the tool to the existing connection that stores the key"],
 correct:3,
 explain:"Vấn đề là tool chưa được liên kết với connection đã lưu key — cần kết nối tool tới đúng connection đó để key được tự động gửi kèm mỗi request. Identity passthrough dùng Entra token của người gọi, không liên quan tới việc gửi API key đã lưu sẵn; thêm key thủ công vào spec là hardcode kém an toàn và khó bảo trì; 'default connection' không đảm bảo trỏ đúng tới connection chứa key cần dùng."},

{id:22, type:"single", text:"A customer support agent calls an internal knowledge API before responding. Some requests take over 15 seconds, and some responses are wrong even when the API returns correct data. You need to inspect the ordered sequence of LLM calls, tool invocations, and timing for individual runs. Which observability capability should you use?",
 options:["Token usage","Monitoring","Safety metrics","Tracing"],
 correct:3,
 explain:"Tracing ghi lại trình tự chi tiết của từng lần chạy: gọi LLM, gọi tool, và thời gian mỗi bước — giúp xác định điểm gây trễ hoặc lý do trả lời sai dù dữ liệu API đúng. Token usage chỉ đo tiêu thụ token; monitoring chỉ cho cái nhìn tổng quan hệ thống, không chi tiết từng run; safety metrics đánh giá nội dung có hại, không liên quan tới debug logic/latency."},

{id:23, type:"tf", text:"A multimodal model accepts image uploads and extracts embedded text to generate responses. Attackers upload images with hidden instructions to manipulate the model. Evaluate each proposed mitigation.",
 statements:[
  {text:"Configuring a prompt shield scoped only to user prompts (text) fully mitigates this risk.", answer:false},
  {text:"Configuring image moderation to block unsafe visual content fully mitigates this risk.", answer:false},
  {text:"Configuring prompt shields scoped to document/image content mitigates this risk.", answer:true},
  {text:"Configuring protected material detection fully mitigates this risk.", answer:false}
 ],
 explain:"Prompt shield chỉ scope cho user prompt (text) không phân tích được nội dung trích xuất từ ảnh, nên không đủ. Image moderation chỉ phát hiện nội dung hình ảnh KHÔNG AN TOÀN (bạo lực, khiêu dâm...), không phát hiện instruction ẩn dạng text embedded trong ảnh. Prompt shields scope cho document/image content thì đúng — được thiết kế để phân tích nội dung trích xuất từ tài liệu/ảnh và chặn instruction độc hại. Protected material detection chỉ nhắm tới nội dung bản quyền, không phải injection attack."},

{id:24, type:"single", text:"A RAG agent answers questions using product documentation. You need a solution to assess whether the agent's generated responses are actually supported by the retrieved documents. What should you recommend?",
 options:["A Retrieval Augmented Generation (RAG) evaluator","A custom guardrail","Model fine-tuning","A groundedness evaluator"],
 correct:3,
 explain:"Groundedness evaluator đo trực tiếp mức độ câu trả lời được hỗ trợ bởi tài liệu truy xuất được — đúng mục tiêu đánh giá. 'RAG evaluator' không phải 1 metric cụ thể tồn tại (RAG được đánh giá bằng tổ hợp nhiều metric như groundedness, relevance...); guardrail là cơ chế chặn thời gian thực, không phải công cụ đánh giá sau khi sinh; fine-tuning là kỹ thuật tuỳ biến model, không phải công cụ đo lường chất lượng."},

{id:25, type:"single", text:"A company needs its customer support agent to answer questions only about the company's own products, not general topics. What is the most direct way to enforce this scope?",
 options:["Modify the system message instructions","Add a few-shot example or two","Apply top-p sampling","Increase the temperature parameter"],
 correct:0,
 explain:"System message định nghĩa phạm vi/hành vi hoạt động của model — sửa nó là cách trực tiếp nhất để giới hạn agent chỉ trả lời về sản phẩm công ty. Few-shot example chỉ định hướng theo ví dụ cụ thể, không đảm bảo giới hạn toàn diện; top-p sampling chỉ ảnh hưởng tới cách chọn token, không giới hạn phạm vi kiến thức; tăng temperature chỉ tăng độ ngẫu nhiên, không kiểm soát được chủ đề trả lời."},

{id:26, type:"single", text:"A customer support solution must: ground responses in internal documentation via Azure AI Search, perform deep multi-step reasoning across long context, and generate detailed natural-language answers. Which model type should power the agent?",
 options:["A multimodal model","A small language model (SLM)","A key-phrase extraction model","A large language model (LLM)"],
 correct:3,
 explain:"LLM có khả năng reasoning sâu qua context dài và sinh văn bản chi tiết, tự nhiên — đúng cả 3 yêu cầu. Multimodal model thêm khả năng ảnh/âm thanh không cần thiết ở đây; SLM đánh đổi khả năng reasoning sâu để lấy tốc độ/chi phí thấp — không phù hợp yêu cầu reasoning phức tạp; key-phrase extraction chỉ trích xuất cụm từ, không sinh câu trả lời chi tiết."},

{id:27, type:"single", text:"A web app (App1) generates responses via a model in Foundry project Project1. Before prompting the model, App1 must retrieve documents through Azure AI Search. Requirements: multiple client apps share the same search config, key-based auth is disallowed, and admin effort must be minimized. What should you do?",
 options:["Manually configure Azure AI Search endpoints in each application","Configure an Azure AI Search connection in Project1 and reference it from each application","Call Azure AI Search directly from each app using Microsoft Entra authentication configured per app","Enable a managed identity in each app and call Azure AI Search directly"],
 correct:1,
 explain:"Connection tập trung trong project cho phép mọi app dùng chung 1 cấu hình, hỗ trợ Entra authentication thay vì key, và giảm công sức quản trị. Cấu hình endpoint thủ công cho từng app tăng công sức và khó đồng nhất; dù dùng Entra auth hay managed identity riêng cho từng app vẫn phải tự cấu hình riêng lẻ, không đạt mục tiêu tối giản quản trị và dùng chung cấu hình."},

{id:28, type:"match", text:"An agent used by financial analysts needs additional capabilities. Match each requirement to the correct built-in tool.",
 rows:[
  {desc:"Access up-to-date information from public websites.", correct:"Grounding with Bing Search"},
  {desc:"Perform calculations during conversations.", correct:"Code interpreter"},
  {desc:"Retrieve information from documents uploaded directly to the agent.", correct:"File search"}
 ],
 pool:["Grounding with Bing Search","Code interpreter","File search","Computer use","Microsoft Fabric"],
 explain:"Grounding with Bing Search lấy thông tin công khai mới nhất; code interpreter chạy Python để tính toán; file search index và truy xuất tài liệu upload trực tiếp cho agent. Computer use dùng để thao tác GUI desktop, không liên quan; Microsoft Fabric là nền tảng phân tích dữ liệu doanh nghiệp, không phải tool hội thoại của agent."},

{id:29, type:"multi", text:"A prompt agent used by a web app is invoked from a Python service that does not run inside the Foundry portal. You need end-to-end tracing that captures latency breakdowns and exceptions across agent runs. Which two components can you use?", note:"Chọn 2 đáp án",
 options:["A Log Analytics workspace","Application Insights","OpenTelemetry","The Azure Monitor Agent","Microsoft Sentinel"],
 correct:[1,2],
 explain:"OpenTelemetry instrument ứng dụng Python để thu thập trace/latency/exception; Application Insights nhận dữ liệu đó và cung cấp dashboard, tracing, dependency map. Log Analytics workspace chỉ lưu/truy vấn dữ liệu, không tự instrument ứng dụng; Azure Monitor Agent thu thập từ VM/server, không phải ứng dụng Python; Microsoft Sentinel là nền tảng bảo mật, không phải công cụ tracing ứng dụng."},

{id:30, type:"single", text:"Customers sometimes return to a support session days later and expect the agent to resume with full historical context — messages, agent replies, tool calls, and tool outputs — reloaded automatically on each new turn. What should you do?",
 options:["Create and reuse a conversation by storing its ID and supplying it on subsequent requests","Persist only the final model response and prepend it to future prompts","Enable memory summarization on the agent definition to persist context automatically","Start a new conversation each time and merge the history manually in application code"],
 correct:0,
 explain:"Lưu và tái sử dụng conversation ID cho phép service tự động tải lại toàn bộ lịch sử tương tác (message, tool call, output) khi khách hàng quay lại — đáp ứng cả continuity trong phiên lẫn giữa các phiên. Chỉ lưu response cuối cùng làm mất chi tiết lịch sử; memory summarization chỉ giữ bản tóm tắt, không đầy đủ tool call/output; tạo conversation mới và tự ghép nối thủ công đi ngược lại mục tiêu tự động hoá."},

{id:31, type:"fill", text:"A Python service sends chat completion requests with extended/adaptive reasoning enabled (thinking={\"type\": \"enabled\"}). Automated validation flags small wording differences as mismatches, and the task itself (a short summary) is simple.",
 blanks:[
  {prefix:"When extended reasoning is enabled, temperature must be set to", options:["1","0","2"], correct:"1", suffix:","},
  {prefix:"and for a simple task, output_config effort should be set to", options:["\"low\"","\"high\"","\"medium\""], correct:"\"low\"", suffix:"to avoid unnecessary reasoning overhead."}
 ],
 explain:"Khi bật thinking/extended reasoning, quy định API yêu cầu temperature phải là 1 (hoặc bỏ qua) — dùng giá trị khác (0 hoặc 2) sẽ bị từ chối với lỗi 400. Với tác vụ đơn giản như tóm tắt ngắn, đặt effort=\"low\" tránh model tốn token suy luận không cần thiết, giảm độ trễ và chi phí mà vẫn đủ chất lượng cho tác vụ đơn giản."},

{id:32, type:"single", text:"A chat app connects to an Azure AI Search vectorized index. Requirements: complex questions must pull information from multiple chunks, multi-turn conversation context must influence retrieval planning, and retrievals should run in parallel to reduce latency. Which retrieval approach should you use?",
 options:["Iterative retrieval","Agentic Retrieval Augmented Generation (RAG)","Chain of thought","Classic Retrieval Augmented Generation (RAG)"],
 correct:1,
 explain:"Agentic RAG dùng 1 agent lập kế hoạch truy xuất: chia câu hỏi phức tạp thành nhiều query, lấy từ nhiều chunk song song, và dùng ngữ cảnh hội thoại trước đó để định hướng truy xuất — đúng cả 3 yêu cầu. Iterative retrieval chạy tuần tự từng bước, không song song; chain of thought chỉ là kỹ thuật reasoning của model, không truy xuất dữ liệu; classic RAG chỉ truy xuất 1 lần duy nhất, không hỗ trợ lập kế hoạch đa lượt hay chạy song song."},

{id:33, type:"single", text:"A marketing team wants to generate several alternative versions of an existing product photo for a campaign, preserving the overall composition, lighting, and subject, using only built-in image generation controls without training a custom model. What should you do?",
 options:["Enable image variation mode and provide the original photo as input","Apply mask inpainting covering the entire photo","Use text-to-image generation from a written description","Set the image-to-image strength parameter to its maximum value"],
 correct:0,
 explain:"Image variation mode nhận ảnh gốc làm input và tạo ra nhiều biến thể phong cách trong khi vẫn giữ các đặc điểm hình ảnh quan trọng — đúng yêu cầu tạo campaign từ ảnh sản phẩm có sẵn. Mask che toàn bộ ảnh thực chất là tái tạo lại toàn bộ; text-to-image tạo ảnh hoàn toàn mới, khó giữ đúng composition/lighting gốc; strength tối đa cho prompt ảnh hưởng mạnh nhất, làm giảm ảnh hưởng của ảnh gốc."},

{id:34, type:"single", text:"An image editing workflow must let a user remove a specific background object from a photo while leaving everything else — including lighting and the main subject — untouched, using built-in editing capabilities only. What should you configure?",
 options:["Text-to-image generation with a detailed prompt","Image variation mode","Mask inpainting with the original image and a mask covering only the object to remove","Image-to-image generation with a high strength value"],
 correct:2,
 explain:"Mask inpainting với ảnh gốc + mask chỉ che đúng vùng cần xoá cho phép chỉnh sửa giới hạn trong vùng đó, giữ nguyên phần còn lại. Text-to-image tạo ảnh hoàn toàn mới; image variation tạo biến thể cho cả bức ảnh, không giới hạn theo vùng; image-to-image với strength cao có thể làm thay đổi cả vùng ngoài ý muốn."},

{id:35, type:"single", text:"A team already has the identifier of a previously generated video clip and needs to revise it with a new prompt while keeping its overall structure intact. Which operation should they call?",
 options:["Download the original video and re-upload it as a new asset","Poll the original generation job until it produces a new version","Call the remix operation with the original video ID and a revised prompt","Start a brand-new generation job with no reference to the earlier result"],
 correct:2,
 explain:"Remix operation với video ID gốc + prompt sửa đổi được thiết kế riêng để chỉnh sửa clip đã tạo trong khi vẫn giữ cấu trúc tổng thể. Tải về/upload lại không thay đổi nội dung; poll chỉ kiểm tra trạng thái job, không tạo phiên bản mới; tạo job hoàn toàn mới không tham chiếu kết quả cũ nên khó giữ được cấu trúc gốc."},

{id:36, type:"single", text:"A logistics company receives forms that are unique to its business and are not covered by any ready-made document model. The team wants to label sample forms and train a model to extract the specific fields it needs from future submissions. What should they use?",
 options:["A pre-built receipt model","A layout-only analysis request","A custom extraction model trained on labeled samples","A searchable-PDF conversion add-on"],
 correct:2,
 explain:"Custom extraction model được train từ mẫu đã gắn nhãn, học đúng các field mà doanh nghiệp cần trích xuất từ những form tương lai có cấu trúc tương tự. Pre-built receipt model chỉ dành cho hoá đơn bán lẻ; layout-only chỉ phát hiện cấu trúc (bảng, đoạn văn) chứ không trích field cụ thể theo schema; searchable-PDF chỉ giúp tìm kiếm nội dung scan, không huấn luyện được model trích xuất."},

{id:37, type:"single", text:"A company already has several trained custom document models, one per form type. They want to submit any incoming document to a single endpoint and have the service automatically classify it and route it to the correct component model. What feature should they use?",
 options:["A composed model","The general Read model","A pre-built layout model","A template labels file"],
 correct:0,
 explain:"Composed model gộp nhiều custom model vào 1 endpoint, tự phân loại document rồi định tuyến tới model con phù hợp nhất. Read model chỉ trích xuất text chung, không lựa chọn giữa nhiều model đã train; layout model chỉ giữ cấu trúc, không routing; template labels file chỉ hỗ trợ chuẩn bị dữ liệu training, không phải cơ chế routing khi vận hành."},

{id:38, type:"match", text:"Match each Document Intelligence model to the scenario it fits best.",
 rows:[
  {desc:"Extract printed and handwritten text with per-line language detection from documents with no predictable structure.", correct:"Read model"},
  {desc:"Preserve document structure such as tables, selection marks, and paragraphs while extracting content.", correct:"Layout model"},
  {desc:"Extract predefined fields such as vendor name, invoice number, and total from standard invoices.", correct:"Prebuilt invoice model"}
 ],
 pool:["Read model","Layout model","Prebuilt invoice model","Prebuilt ID document model","Custom classification model"],
 explain:"Read model tập trung vào OCR text (in/viết tay) và phát hiện ngôn ngữ theo dòng, phù hợp tài liệu không có cấu trúc cố định. Layout model bổ sung nhận diện cấu trúc trang (bảng, selection mark). Prebuilt invoice model đã train sẵn để trích các field chuẩn của hoá đơn. Prebuilt ID document model dành cho giấy tờ tuỳ thân, custom classification model dùng để phân loại tài liệu — không phù hợp với 3 mô tả trên."},

{id:39, type:"multi", text:"A healthcare organization must share patient chat transcripts with an external analytics team while reducing the risk of exposing personal information. Which two Azure AI Language capabilities are most directly relevant?", note:"Chọn 2 đáp án",
 options:["PII detection","Redaction of detected PII spans in the returned text","Key phrase extraction","Language detection"],
 correct:[0,1],
 explain:"PII detection xác định các vùng chứa thông tin cá nhân trong văn bản, và redaction có thể ẩn/thay thế các vùng đó trước khi chia sẻ — trực tiếp giảm rủi ro lộ thông tin cá nhân. Key phrase extraction chỉ rút ra cụm từ quan trọng để tóm tắt, không xử lý privacy; language detection chỉ xác định ngôn ngữ, không liên quan tới bảo vệ dữ liệu cá nhân."},

{id:40, type:"single", text:"Named entity recognition processes the sentence: 'Microsoft was founded in 1975 by Bill Gates in Albuquerque.' Which mapping of entities to categories is correct?",
 options:["Microsoft: Person, 1975: Organization, Bill Gates: Location, Albuquerque: DateTime","Microsoft: Organization, 1975: DateTime, Bill Gates: Person, Albuquerque: Location","Microsoft: Location, 1975: Person, Bill Gates: Organization, Albuquerque: DateTime","Microsoft: DateTime, 1975: Location, Bill Gates: Organization, Albuquerque: Person"],
 correct:1,
 explain:"Microsoft là 1 tổ chức (Organization), 1975 là mốc thời gian (DateTime), Bill Gates là tên người (Person), Albuquerque là địa danh (Location) — đây là cách gán đúng loại thực thể. Các đáp án khác đều gán sai loại cho ít nhất 1 thực thể (ví dụ coi tên công ty là địa điểm, hay coi năm là tên người)."},

{id:41, type:"fill", text:"A developer reviews a language detection response before routing user messages to language-specific processing.",
 blanks:[
  {prefix:"The confidence score returned is expressed as a value between", options:["0 and 1","0 and 10","0 and 100"], correct:"0 and 1", suffix:","},
  {prefix:"and a score closer to", options:["1 indicates greater confidence in the detected language","0 indicates greater confidence in the detected language","10 indicates greater confidence in the detected language"], correct:"1 indicates greater confidence in the detected language", suffix:"."}
 ],
 explain:"Confidence score của language detection nằm trong khoảng 0 đến 1, giá trị càng gần 1 nghĩa là độ tin cậy vào ngôn ngữ được nhận diện càng cao — không phải thang điểm 0-10 hay 0-100, và giá trị gần 0 không phải là dấu hiệu tin cậy cao."},

{id:42, type:"single", text:"A team wants to know the overall positive/negative tone of customer reviews as well as the specific important topics mentioned in each review. Which pair of Azure AI Language capabilities fits this need?",
 options:["Language detection and named entity recognition","Sentiment analysis and key phrase extraction","PII detection and text summarization","Entity linking and document translation"],
 correct:1,
 explain:"Sentiment analysis đánh giá cảm xúc tổng thể (tích cực/tiêu cực), còn key phrase extraction rút ra các cụm từ/chủ đề quan trọng trong văn bản — đúng cả 2 nhu cầu. Language detection chỉ xác định ngôn ngữ; NER trích xuất thực thể có tên (không phải chủ đề chung); PII detection/summarization và entity linking/translation không đo được tông cảm xúc hay chủ đề quan trọng theo đúng cách cần thiết ở đây."},

{id:43, type:"fill", text:"A developer is implementing a translation feature where the source language of incoming text is not known in advance, but the text must always be translated into both French and Japanese.",
 blanks:[
  {prefix:"The developer can", options:["omit from_language so the service auto-detects it","set from_language to a fixed value","omit to_language entirely"], correct:"omit from_language so the service auto-detects it", suffix:","},
  {prefix:"and must provide", options:["a to_language list containing both target language codes","only one to_language code at a time","a translation_scope parameter instead of to_language"], correct:"a to_language list containing both target language codes", suffix:"."}
 ],
 explain:"Khi không biết trước ngôn ngữ nguồn, có thể bỏ qua from_language để service tự phát hiện. to_language nhận 1 danh sách mã ngôn ngữ đích — có thể chứa nhiều ngôn ngữ (ví dụ Pháp và Nhật) trong cùng 1 request. Đặt cứng from_language sẽ sai khi ngôn ngữ nguồn không biết trước; chỉ định 1 to_language tại 1 thời điểm hoặc dùng translation_scope không đáp ứng được yêu cầu dịch sang nhiều ngôn ngữ đích cùng lúc."},

{id:44, type:"single", text:"Supervisors need to view call transcripts and flag potential issues within a few seconds of the audio being spoken, while the call is still in progress. Which capability should the solution use?",
 options:["Batch transcription","Text-to-speech","Speech translation","Real-time speech-to-text"],
 correct:3,
 explain:"Real-time speech-to-text xử lý audio streaming với độ trễ thấp, cho phép transcript xuất hiện gần như ngay lập tức trong khi cuộc gọi đang diễn ra. Batch transcription chỉ hoạt động sau khi đã có file ghi âm hoàn chỉnh; text-to-speech làm ngược lại (tạo audio từ text); speech translation chỉ cần khi cần dịch sang ngôn ngữ khác, không phải yêu cầu chính ở đây."},

{id:45, type:"multi", text:"A team wants to use SSML to make a synthesized voice sound more natural for a customer-facing assistant. Which three customizations can SSML control directly?", note:"Chọn 3 đáp án",
 options:["Adjusting prosody such as pitch and speaking rate","Specifying phonetic pronunciation for a difficult term","Inserting pre-recorded audio into the synthesized output","Creating a speech recognizer to capture microphone input"],
 correct:[0,1,2],
 explain:"SSML có thể điều chỉnh prosody (cao độ, tốc độ nói), chỉ định phát âm ngữ âm cho từ khó, và chèn audio đã ghi sẵn vào output tổng hợp. Tạo speech recognizer thuộc về speech-to-text (nhận diện giọng nói), không phải khả năng của SSML — vốn dùng cho speech synthesis (tạo giọng nói từ text)."},

{id:46, type:"fill", text:"A document processing team notices that some extracted field values are not reliable enough for fully automated handling and want to route low-confidence results for manual review.",
 blanks:[
  {prefix:"A confidence score above roughly", options:["0.9","0.5","0.1"], correct:"0.9", suffix:"is often suitable for fully automated processing,"},
  {prefix:"while a confidence score below roughly", options:["0.7","0.95","0.3"], correct:"0.7", suffix:"typically indicates manual review should be considered."}
 ],
 explain:"Điểm tin cậy cao (khoảng trên 0.9) thường đủ an toàn để xử lý hoàn toàn tự động; điểm thấp (dưới khoảng 0.7) thường là dấu hiệu nên đưa vào review thủ công trước khi dùng kết quả. Đây là ngưỡng tham khảo phổ biến, không phải quy tắc cứng, nhưng thể hiện đúng nguyên tắc: điểm càng thấp càng cần con người xác nhận."},

{id:47, type:"tf", text:"For each statement about Azure AI Search index field attributes, indicate True or False.",
 statements:[
  {text:"A field marked as filterable can be used in filter expressions to narrow search results.", answer:true},
  {text:"A field marked as sortable can be used to order the returned results.", answer:true},
  {text:"A facetable field is used to generate discrete values that users can select to refine results, such as category or brand.", answer:true},
  {text:"A searchable field is used only for sorting and cannot participate in full-text queries.", answer:false}
 ],
 explain:"1,2,3 True: filterable hỗ trợ lọc kết quả; sortable hỗ trợ sắp xếp; facetable hỗ trợ tạo giá trị rời rạc để người dùng lọc thêm (category, brand...). 4 False: searchable field dùng cho full-text search — việc sắp xếp do thuộc tính sortable đảm nhiệm, không phải searchable."},

{id:48, type:"multi", text:"A knowledge store needs to persist projections of AI-enriched data extracted from a document processing pipeline. Which formats can a knowledge store use to store these projections?", note:"Chọn 3 đáp án",
 options:["JSON objects","Tables","Image files","Firewall policies","Query analyzers"],
 correct:[0,1,2],
 explain:"Knowledge store có thể lưu projection dưới dạng JSON object (cho tích hợp downstream), table (cho báo cáo/phân tích dạng quan hệ), và image file (khi cần lưu nội dung ảnh đã trích xuất). Firewall policy và query analyzer thuộc về network security và xử lý truy vấn tìm kiếm, không phải định dạng lưu trữ projection."},

{id:49, type:"single", text:"A team is choosing an Azure resource type for a new solution that will use several AI capabilities together — language, vision, and speech — under a single endpoint and key, to simplify management. Which resource type best fits?",
 options:["A single-service resource dedicated only to one AI capability","A Microsoft Foundry resource that supports multiple AI services","An Azure Storage account with a blob container","An Azure Virtual Network"],
 correct:1,
 explain:"Microsoft Foundry resource cung cấp 1 endpoint và key dùng chung cho nhiều dịch vụ AI (ngôn ngữ, thị giác, giọng nói...), phù hợp khi cần đơn giản hoá quản lý qua nhiều capability. Single-service resource chỉ phục vụ đúng 1 capability, sẽ phải tạo nhiều resource riêng lẻ; storage account chỉ lưu dữ liệu, không cung cấp AI capability; virtual network chỉ là hạ tầng mạng, không liên quan tới việc gọi dịch vụ AI."},

{id:50, type:"order", text:"Arrange the stages of a responsible generative AI harm-mapping workflow in the correct order.",
 correctOrder:["Identify potential harms","Measure whether the harms occur in practice","Mitigate the identified harms with safeguards","Manage the solution responsibly after deployment"],
 explain:"Quy trình bắt đầu bằng việc xác định các rủi ro/harm có thể xảy ra → đo lường xem harm đó có thực sự xuất hiện trong thực tế không → áp dụng biện pháp giảm thiểu (mitigation) → cuối cùng quản lý vận hành có trách nhiệm sau khi triển khai (giám sát, sẵn sàng vận hành liên tục). Thứ tự này đảm bảo mỗi bước dựa trên kết quả của bước trước."}
];
