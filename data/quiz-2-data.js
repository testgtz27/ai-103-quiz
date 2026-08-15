/* =========================================================
   AI-103 Quiz 2
   Biên soạn lại theo các chủ đề/khái niệm thường gặp trong đề thi
   AI-103 (không sao chép nguyên văn từ nguồn bên thứ ba).
   type: single | multi | tf | match | order | fill
   ========================================================= */
const quizData = [
{id:1, type:"single", text:"A customer support agent must reason deeply over long, multi-step conversations and generate detailed natural-language explanations. Which model type best fits this requirement?",
 options:["A multimodal model that also processes images and audio","A small language model (SLM) optimized for low latency","A key-phrase extraction model","A large language model (LLM)"],
 correct:3,
 explain:"LLM phù hợp nhất cho việc reasoning nhiều bước và tạo văn bản giải thích chi tiết. SLM đánh đổi khả năng reasoning sâu để lấy tốc độ/chi phí thấp hơn — không phù hợp khi cần suy luận phức tạp. Multimodal model thêm khả năng xử lý ảnh/âm thanh nhưng không cần thiết ở đây. Key-phrase extraction chỉ là tác vụ NLP hẹp, không phải model sinh văn bản reasoning."},

{id:2, type:"single", text:"An agent needs to answer complex questions that require breaking the question into multiple sub-queries, using conversation history to guide retrieval, and running sub-queries in parallel to reduce latency. Which retrieval approach fits best?",
 options:["Sequential iterative retrieval that retrieves one chunk at a time","Chain-of-thought prompting without any retrieval step","Agentic RAG that decomposes and parallelizes retrieval","Classic single-shot RAG"],
 correct:2,
 explain:"Agentic RAG chia nhỏ câu hỏi phức tạp thành nhiều sub-query, dùng lịch sử hội thoại để định hướng truy vấn, và có thể chạy song song để giảm độ trễ — khớp với cả 3 yêu cầu. Classic RAG chỉ truy xuất một lần (single-shot), không chia nhỏ. Iterative retrieval là tuần tự, không song song. Chain-of-thought là kỹ thuật prompting, không phải phương pháp truy xuất dữ liệu.",},

{id:3, type:"single", text:"A retail company wants its support agent to answer questions only about the company's own products, using PDF catalogs stored privately in Azure Blob Storage. The agent must retrieve relevant passages using semantic and vector search. Which service should be used as the retrieval layer?",
 options:["Azure Translator in Foundry Tools","Grounding with Bing Search","Azure AI Search","Azure AI Document Intelligence"],
 correct:2,
 explain:"Azure AI Search cung cấp index có semantic/vector search để agent truy xuất nội dung riêng tư (PDF nội bộ). Bing Search grounding chỉ tìm trên internet công khai, không index tài liệu riêng. Translator chỉ dịch ngôn ngữ. Document Intelligence trích xuất nội dung từ tài liệu nhưng không phải lớp truy xuất/index cho RAG."},

{id:4, type:"single", text:"A team is indexing PDFs that contain embedded images. They want the built-in OCR skill in an Azure AI Search skillset to process text inside those images. Which indexing approach correctly feeds images into the OCR skill?",
 options:["Use an indexer to extract image data into a normalized_images collection","Use a Shaper skill to restructure the OCR input","Run the OCR skill directly against the raw content field of the index","Use outputFieldMappings to write image data to a searchable field"],
 correct:0,
 explain:"OCR skill có sẵn của Azure AI Search cần input là normalized_images collection, được tạo ra khi indexer trích xuất ảnh nhúng trong tài liệu. Shaper skill chỉ tái cấu trúc dữ liệu, không trích ảnh. Chạy OCR trực tiếp trên content field sẽ không hoạt động vì đó là text, không phải ảnh. outputFieldMappings dùng để ghi kết quả ra field cuối, không phải bước trích ảnh đầu vào."},

{id:5, type:"single", text:"A responsible AI reviewer wants an agent to automatically detect and mask any personal information (names, phone numbers, emails) appearing in generated responses before they reach the end user. Which safeguard should be configured?",
 options:["A content safety filter for violence and hate speech only","PII detection and redaction on model output","A rate limit on requests per minute","A larger context window for the model"],
 correct:1,
 explain:"PII detection và redaction được thiết kế riêng để phát hiện và ẩn thông tin cá nhân trong output. Content safety filter cho violence/hate không xử lý PII. Rate limit và context window không liên quan tới việc bảo vệ dữ liệu cá nhân."},

{id:6, type:"single", text:"A team wants to give a Microsoft Foundry agent access to internal ticketing data. They want the agent to discover and call available operations from a remote service dynamically, without hardcoding every function signature in the agent's code. Which mechanism fits best?",
 options:["Model Context Protocol (MCP) tool integration","A fixed system prompt describing every operation in text","A single hardcoded function tool per operation","Increasing the model's temperature setting"],
 correct:0,
 explain:"MCP cho phép agent khám phá và gọi tool từ một server từ xa một cách linh hoạt tại runtime, không cần viết cứng từng function. Mô tả trong system prompt không đảm bảo agent gọi đúng API thực tế. Hardcode từng function tool đi ngược lại yêu cầu 'không cần viết cứng'. Temperature không liên quan tới việc tích hợp tool."},

{id:7, type:"single", text:"An architect is designing a multi-agent pipeline where a triage agent must send each request to exactly one of several specialist agents based on the request's classification. Which orchestration pattern fits best?",
 options:["Sequential orchestration where every agent always runs in a fixed order","Handoff orchestration with routing based on classification","Concurrent orchestration where all agents run in parallel regardless of topic","Running all agents on every request and picking the longest response"],
 correct:1,
 explain:"Handoff orchestration cho phép chuyển yêu cầu tới đúng agent chuyên biệt dựa trên phân loại/context — đúng với yêu cầu 'gửi tới đúng 1 agent'. Sequential orchestration luôn chạy agent theo thứ tự cố định bất kể nội dung. Concurrent chạy song song tất cả, lãng phí tài nguyên khi chỉ cần một agent xử lý. Chạy tất cả rồi chọn response dài nhất không phải là logic routing hợp lý."},

{id:8, type:"single", text:"A team is choosing between fine-tuning a model and using retrieval augmented generation (RAG) for a support assistant that needs up-to-date product prices that change daily. Which approach is more appropriate and why?",
 options:["Fine-tuning, because it permanently embeds facts into model weights","RAG, because it injects current knowledge at inference time without retraining","Fine-tuning, because it is cheaper to update than a search index","Neither approach can handle frequently changing information"],
 correct:1,
 explain:"RAG lấy dữ liệu mới nhất tại thời điểm truy vấn (runtime), phù hợp với dữ liệu thay đổi hàng ngày như giá sản phẩm. Fine-tuning yêu cầu train lại mỗi khi dữ liệu đổi — tốn kém và chậm hơn nhiều so với cập nhật index. Cả hai phương pháp đều xử lý được thông tin động, nhưng RAG hiệu quả hơn nhiều trong trường hợp này."},

{id:9, type:"multi", text:"A team is setting up a Content Understanding analyzer to process scanned troubleshooting guides with two-column layouts and tables. Which capabilities should they rely on to correctly extract structured field values?", note:"Chọn 2 đáp án",
 options:["A field schema that defines the fields to extract from the document","A layout-aware analyzer that understands tables and multi-column pages","Deleting all table structures before indexing so text stays linear","Ignoring page layout information entirely and processing raw OCR text only"],
 correct:[0,1],
 explain:"Field schema định nghĩa cụ thể field cần trích xuất, còn layout-aware analyzer hiểu được bảng biểu/nhiều cột để không làm lẫn lộn thứ tự đọc. Xoá cấu trúc bảng hoặc bỏ qua layout sẽ làm mất thông tin quan trọng và gây sai lệch khi trích xuất từ tài liệu phức tạp."},

{id:10, type:"single", text:"An organization must ensure an agent's tool-calling behavior requires human approval before any action that modifies external data (e.g., creating a ticket). Which configuration addresses this requirement?",
 options:["Disable all function tools for the agent","Configure an approval mode that requires confirmation before tool execution","Increase the agent's temperature so it asks more questions","Remove the agent's access to conversation history"],
 correct:1,
 explain:"Approval mode cho tool cho phép yêu cầu xác nhận của con người trước khi thực thi hành động có tác động (như tạo ticket) — đúng yêu cầu. Tắt hết tool sẽ làm agent mất khả năng hành động hoàn toàn, không phải giải pháp mong muốn. Temperature và conversation history không liên quan tới việc kiểm soát quyền thực thi tool."},

{id:11, type:"single", text:"A team wants to reduce the risk of an agent 'hallucinating' facts by ensuring every claim in its response is backed by a retrieved source document, and users can click through to that source. What best supports this requirement?",
 options:["Increasing the model's max output tokens","Grounding responses in retrieved content with citations back to source documents","Lowering the temperature to zero only","Switching to a smaller, faster model"],
 correct:1,
 explain:"Grounding kết hợp với citation đảm bảo mỗi câu trả lời được neo vào tài liệu nguồn cụ thể mà người dùng có thể kiểm tra lại — trực tiếp giảm hallucination và tăng độ tin cậy. Tăng max tokens, giảm temperature về 0, hay đổi sang model nhỏ hơn không đảm bảo tính đúng đắn hay khả năng truy vết nguồn."},

{id:12, type:"single", text:"A developer needs a single Azure resource that provides the broadest feature availability and tightest integration when building solutions that use the Voice Live API. Which resource type should they choose?",
 options:["A generic Cognitive Services multi-service resource created outside Foundry","A Microsoft Foundry resource","A storage account configured for audio files","An Azure Kubernetes Service cluster"],
 correct:1,
 explain:"Microsoft Foundry resource được khuyến nghị vì cung cấp đầy đủ tính năng và tích hợp tốt nhất với hệ sinh thái Foundry cho các workload dùng Voice Live API. Storage account hay AKS cluster không phải là resource cung cấp API này; multi-service resource ngoài Foundry không có mức tích hợp tương đương."},

{id:13, type:"single", text:"A solution must classify incoming support tickets into categories and then route each ticket to a different specialist agent using a switch-style pattern, without duplicating the same conditional logic for every possible category. What design technique best supports this?",
 options:["Hardcode a separate if/else branch manually for every category","Use factory functions that generate a condition checker per category value","Run every specialist agent on every ticket and keep only the first response","Store the category as free text and let the model guess the route each time"],
 correct:1,
 explain:"Factory function tạo ra logic điều kiện có thể tái sử dụng cho từng giá trị phân loại, tránh viết lặp lại code branching. Viết tay từng nhánh if/else cho mỗi category sẽ khó bảo trì khi số category tăng lên. Chạy tất cả agent rồi chỉ giữ response đầu tiên lãng phí tài nguyên. Để model tự đoán route mỗi lần thiếu kiểm soát và không đáng tin cậy."},

{id:14, type:"single", text:"A team needs to generate a short promotional video clip directly from a written creative brief, without filming any footage. Which Azure AI capability fits this need?",
 options:["Object detection on existing video footage","Video generation from text prompts","Speech-to-text transcription of an existing video's audio track","Image classification of video thumbnails"],
 correct:1,
 explain:"Video generation model tạo video mới hoàn toàn từ prompt văn bản, đúng yêu cầu không cần quay phim thật. Object detection và image classification chỉ phân tích nội dung có sẵn, không tạo mới. Speech-to-text chỉ chuyển âm thanh có sẵn thành văn bản."},

{id:15, type:"single", text:"An application submits a request to an asynchronous Content Understanding analyzer and receives an operation ID with status 'running'. What should the application do to obtain the final result?",
 options:["Immediately assume the operation failed and retry from scratch","Poll the operation status endpoint using the operation ID until it completes","Resubmit the same original request repeatedly with new content","Delete the analyzer and create a new one to force completion"],
 correct:1,
 explain:"Với thao tác bất đồng bộ, ứng dụng cần poll (kiểm tra định kỳ) trạng thái bằng operation ID cho tới khi hoàn tất, thay vì coi là lỗi ngay, gửi lại request gốc, hay xoá/tạo lại analyzer."},

{id:16, type:"single", text:"A healthcare provider wants to detect the language of incoming patient messages that could arrive in any of several languages, before routing each message to the right language-specific workflow. Which Azure AI Language capability fits this need?",
 options:["Key phrase extraction","Language detection","Text summarization","Entity linking"],
 correct:1,
 explain:"Language detection xác định ngôn ngữ của văn bản đầu vào, cho phép định tuyến tới workflow phù hợp. Key phrase extraction, summarization, và entity linking là các tác vụ NLP khác, không xác định ngôn ngữ."},

{id:17, type:"single", text:"A team building a customer-facing voice assistant wants specific product names to be pronounced correctly and wants to control pitch and speaking rate for a more natural voice. Which technology should they use to control this?",
 options:["A JSON configuration file sent as the chat message role","SSML markup applied to the speech synthesis request","A higher temperature setting on the underlying model","A larger max_tokens value in the completion request"],
 correct:1,
 explain:"SSML cho phép kiểm soát phát âm ngữ âm và prosody (pitch, tốc độ nói) trong tổng hợp giọng nói. Role trong chat message chỉ đánh dấu người nói (user/assistant), không liên quan tới giọng nói. Temperature và max_tokens là tham số của model sinh văn bản, không điều khiển được cách phát âm giọng nói."},

{id:18, type:"single", text:"A document processing pipeline must extract printed and handwritten text and detect the language of each individual line, from documents that have no predictable structure (mixed forms, notes, letters). Which Document Intelligence model fits best?",
 options:["A prebuilt invoice model","The general Read model","A prebuilt contract model","A custom classification model trained only on invoices"],
 correct:1,
 explain:"Read model chuyên trích xuất text in/viết tay và phát hiện ngôn ngữ theo dòng, phù hợp với tài liệu không có cấu trúc cố định. Invoice và contract model chỉ dành riêng cho loại tài liệu cụ thể đó. Custom classification model trên invoice không giải quyết được yêu cầu đọc text tổng quát trên tài liệu đa dạng."},

{id:19, type:"tf", text:"For each statement about model deployment in Microsoft Foundry, indicate True or False.",
 statements:[
  {text:"A standard deployment is confined to a single region, which can help satisfy data residency requirements.", answer:true},
  {text:"Every model in the Foundry catalog supports exactly the same set of deployment types.", answer:false},
  {text:"Provisioned throughput deployments reserve capacity, which can provide more predictable performance than pure pay-per-token billing.", answer:true},
  {text:"Once an agent is deployed, its underlying model deployment can never be changed or upgraded.", answer:false}
 ],
 explain:"1&3 True: standard deployment giới hạn 1 vùng (hỗ trợ data residency); provisioned throughput đặt trước công suất cho hiệu năng ổn định hơn. 2 False: các loại deployment hỗ trợ khác nhau tuỳ model, cần kiểm tra riêng từng model. 4 False: model deployment phía sau agent có thể thay đổi/nâng cấp theo thời gian."},

{id:20, type:"single", text:"A company runs adversarial red-team testing against its generative AI assistant and finds several prompts that reliably trigger unsafe output. What is the most appropriate next step?",
 options:["Delete the test results immediately so they don't leak", "Document the findings and review them with stakeholders to assess real-world risk and guide mitigation", "Use the findings only to write faster unit tests for latency", "Ignore the findings since the assistant passed most other tests"],
 correct:1,
 explain:"Kết quả red-team thành công cần được ghi lại và đánh giá cùng các bên liên quan để hiểu rủi ro thực tế và định hướng giảm thiểu — đây là quy trình responsible AI chuẩn. Xoá bỏ, bỏ qua, hay chỉ dùng cho latency test đều không tận dụng đúng giá trị của phát hiện an toàn này."},

{id:21, type:"single", text:"A workflow node needs to call an AI component and may receive back either a plain-language answer or a structured JSON object for the next node to consume. Which node type should be used?",
 options:["End node","Invoke node","Basic chat node","Flow/branch node only"],
 correct:1,
 explain:"Invoke node gọi trực tiếp một AI component/agent và có thể trả về text thường hoặc JSON có cấu trúc cho bước sau xử lý. End node chỉ kết thúc workflow. Basic chat hỗ trợ hội thoại người dùng. Flow/branch node chỉ quản lý luồng điều khiển, không tự gọi AI."},

{id:22, type:"single", text:"A pipeline has clearly defined, ordered stages where each stage's failure-handling has already been planned, and each stage builds on the previous stage's output. Which orchestration pattern is most suitable?",
 options:["Concurrent orchestration, since all stages should run at once", "Sequential orchestration, since stages run in a fixed, predictable order", "Dynamic agent selection, since the next stage should be chosen at runtime", "No orchestration, since stages don't need coordination"],
 correct:1,
 explain:"Sequential orchestration phù hợp khi các stage có vai trò rõ ràng, chạy theo thứ tự cố định, và lỗi/độ trễ từng bước đã được lên kế hoạch xử lý. Concurrent chạy song song không phù hợp khi các bước phụ thuộc lẫn nhau. Dynamic selection không cần thiết khi thứ tự đã cố định."},

{id:23, type:"single", text:"A team wants to keep the ability to review earlier versions of an agent workflow, compare what changed, and roll back if a recent update introduces a bug. Which capability supports this?",
 options:["Basic chat logging only", "Workflow versioning", "Increasing the model's temperature", "A larger conversation window"],
 correct:1,
 explain:"Versioning lưu lại các phiên bản trước của workflow, cho phép so sánh và khôi phục khi cần. Basic chat logging chỉ ghi lại hội thoại, không phải cấu hình workflow. Temperature và conversation window không liên quan tới quản lý phiên bản."},

{id:24, type:"multi", text:"Which of the following are valid reasons to add automatic language detection to a text-processing pipeline?", note:"Chọn 2 đáp án",
 options:["The pipeline receives free-form text from many different sources and the language of each entry is unknown in advance","The team wants to increase the maximum number of documents allowed per batch request","A chat application needs to determine a user's language early in the conversation to select the right response language","The team wants to compress text so each document stays under a character limit"],
 correct:[0,2],
 explain:"Language detection hữu ích khi ngôn ngữ đầu vào chưa biết trước (nguồn đa dạng) hoặc cần xác định ngôn ngữ người dùng sớm để phản hồi phù hợp. Nó không liên quan tới việc tăng giới hạn batch hay nén văn bản."},

{id:25, type:"single", text:"An agent framework must support tool use, persistent conversation history, and collaboration between multiple specialized agents within structured workflows. Which type of platform best matches this description?",
 options:["A dashboard-only reporting tool with scheduled exports", "A rules-only automation engine with no model-based reasoning", "An agent framework with structured workflows and extensible capabilities", "A storage service used only for archiving transcripts"],
 correct:2,
 explain:"Đây là mô tả đúng của một agent framework: hỗ trợ reasoning theo model, workflow có cấu trúc, tool use, lưu lịch sử hội thoại, và cộng tác đa agent. Các lựa chọn khác (dashboard, rules engine, storage service) đều thiếu ít nhất một trong các khả năng cốt lõi này."},

{id:26, type:"single", text:"A team needs to give an agent centrally-managed access to a growing, frequently changing set of external tools without having to edit the agent's code every time a tool is added or changed. What capability addresses this?",
 options:["Static API pinning to a fixed tool list", "Dynamic tool discovery at runtime", "Hardcoded wrapper functions per tool", "Running the agent only with local, offline tools"],
 correct:1,
 explain:"Dynamic tool discovery cho phép agent tìm và dùng tool khả dụng tại runtime, giảm việc phải sửa code agent mỗi khi danh sách tool thay đổi. Static pinning và hardcoded wrapper đòi hỏi cập nhật thủ công liên tục. Chỉ dùng tool offline không giải quyết được vấn đề mở rộng tool bên ngoài."},

{id:27, type:"single", text:"Before fine-tuning a model, a team skips measuring how the un-tuned base model performs on their task. What is the main risk of skipping this step?",
 options:["The fine-tuned model cannot be deployed afterward", "The team will have no baseline to judge whether fine-tuning actually improved or degraded performance", "JSONL training files cannot be validated without a baseline", "LoRA cannot be applied without a baseline measurement"],
 correct:1,
 explain:"Không có baseline, đội ngũ không thể xác định fine-tuning có thực sự cải thiện hiệu năng hay không, vì thiếu điểm tham chiếu để so sánh trước/sau. Việc deploy, validate JSONL hay áp dụng LoRA đều không phụ thuộc vào việc có baseline hay không."},

{id:28, type:"single", text:"A team wants a chatbot that stays strictly on one topic, uses a specific brand tone, and asks clarifying questions when details are missing — and they want to ship this behavior today without any model training or new infrastructure. What is the most appropriate approach?",
 options:["Fine-tuning the model on brand-voice examples", "Prompt engineering with clear instructions and examples", "Training a new model from scratch", "Retrieval augmented generation using an external knowledge base"],
 correct:1,
 explain:"Prompt engineering cho phép định hình hành vi, giọng văn, và cách hỏi lại chỉ bằng hướng dẫn — triển khai ngay không cần training hay hạ tầng mới. Fine-tuning và training from scratch cần thời gian/tài nguyên. RAG hữu ích khi cần kiến thức ngoài, không phải để kiểm soát tông giọng/hành vi ngay lập tức."},

{id:29, type:"single", text:"A semantic search feature needs to compare the meaning of two passages mathematically, rather than by exact keyword match. How is each passage's meaning typically represented for this comparison?",
 options:["As a compressed ZIP archive of the raw text", "As a vector of floating-point numbers (an embedding)", "As a bitmap image rendering of the text", "As a fixed list of keyword tags only"],
 correct:1,
 explain:"Embedding biểu diễn ý nghĩa văn bản dưới dạng vector số thực, cho phép so sánh ngữ nghĩa bằng phép toán (ví dụ cosine similarity). Archive, bitmap, hay keyword tag list không cung cấp khả năng so sánh ngữ nghĩa liên tục như vậy."},

{id:30, type:"single", text:"A content moderation report summarizes results as a 'defect rate' for a generative AI system. What does that metric represent?",
 options:["The average length of unsafe responses in tokens", "The percentage of responses that exceed a chosen severity threshold for harm", "The number of prompts submitted per minute during testing", "The percentage of prompts that included a reference answer"],
 correct:1,
 explain:"Defect rate thể hiện tỷ lệ % phản hồi vượt qua ngưỡng mức độ nghiêm trọng (severity threshold) đã chọn cho một loại harm cụ thể. Nó không đo độ dài phản hồi, tốc độ gửi prompt, hay tỷ lệ có đáp án tham chiếu."}
];
