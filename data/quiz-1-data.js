const quizData = [
{id:1, type:"multi", text:"Select which statements are correct about generative AI, NLP, LLMs, and AI agents.", note:"Chọn 3 đáp án đúng",
 options:["Large language models are part of a broader language AI field that builds on NLP concepts.",
 "Natural language processing can use statistical and semantic models to interpret written language.",
 "Large language models always replace traditional text analysis techniques in enterprise search solutions.",
 "AI agents can combine a language model with instructions and tools to retrieve relevant knowledge and carry out assigned work.",
 "Natural language processing applies only to speech recognition and voice-based interfaces."],
 correct:[0,1,3],
 explain:"A, B, D đúng: LLM là một phần của language AI, NLP dùng mô hình thống kê/ngữ nghĩa để hiểu văn bản, và AI agents kết hợp LLM với tool/instructions để thực hiện công việc. C sai vì LLM không thay thế hoàn toàn các kỹ thuật phân tích văn bản truyền thống (keyword, classification vẫn hữu ích). E sai vì NLP áp dụng cho cả văn bản viết, không chỉ giọng nói."},

{id:2, type:"match", text:"Match each AI capability description to the correct capability.",
 rows:[
   {desc:"Produces original responses from natural language prompts and supports task-focused autonomous behavior through tools/instructions.", correct:"Generative AI and agents"},
   {desc:"Interprets written language in sources such as emails, documents, and social posts.", correct:"Natural language processing"},
   {desc:"Recognizes spoken language and can generate spoken output for users.", correct:"Computer speech"},
   {desc:"Interprets visual input from images, videos, and camera feeds.", correct:"Computer vision"},
   {desc:"Pulls key details such as dates, totals, and line items from receipts, forms, or recordings.", correct:"Information extraction"}
 ],
 pool:["Generative AI and agents","Natural language processing","Computer speech","Computer vision","Information extraction","Barcode-only automation","Manual document review"],
 explain:"Generative AI/agents tạo nội dung mới và tự hành động; NLP xử lý văn bản viết; Computer speech xử lý giọng nói; Computer vision xử lý hình ảnh/video; Information extraction trích xuất chi tiết cụ thể. 'Barcode-only automation' và 'Manual document review' không phải năng lực AI phù hợp ở đây."},

{id:3, type:"tf", text:"For each statement, indicate True or False.",
 statements:[
  {text:"Generative AI can be used for AI-assisted content creation.", answer:true},
  {text:"A solution that reads text aloud is an example of computer speech.", answer:true},
  {text:"Computer vision is only useful when barcodes are available for scanning.", answer:false},
  {text:"Choosing the required AI capabilities helps determine which services should be configured in a solution.", answer:true}
 ],
 explain:"1&2 True: generative AI tạo nội dung; đọc văn bản thành giọng nói là text-to-speech (computer speech). 3 False: computer vision xử lý ảnh/video trực tiếp, không chỉ giới hạn ở mã vạch. 4 True: xác định capability cần thiết giúp chọn đúng Azure service."},

{id:4, type:"single", text:"A developer using a Python-enabled runtime tries to load an extremely large dataset into memory and also tries to pull live data directly from an external website. Which limitation pair is most relevant?",
 options:["No error visibility and no sandboxing","No file support and no mathematical libraries","No external network access and memory constraints","No JSON handling and no timeout limits"],
 correct:2,
 explain:"Môi trường Python bị giới hạn (sandbox) thường không cho phép gọi mạng ra ngoài tuỳ ý, và tải dataset khổng lồ có thể vượt giới hạn bộ nhớ. Do đó đáp án C phù hợp nhất với 2 vấn đề mô tả."},

{id:5, type:"tf", text:"For each statement, indicate True or False (model catalog/model card).",
 statements:[
  {text:"A model card can provide details such as provider, capabilities, benchmark results, responsible AI considerations, and deployment methods.", answer:true},
  {text:"In a model catalog, collection and source refer to the same attribute and can be used interchangeably when filtering models.", answer:false},
  {text:"Small language models are often a suitable choice when lower cost and operational efficiency matter more than achieving the strongest possible reasoning performance.", answer:true},
  {text:"Video generation models are designed to create video content from text-based prompts.", answer:true}
 ],
 explain:"1 True: model card tóm tắt đầy đủ thông tin model. 2 False: collection và source là hai thuộc tính khác nhau (source = nguồn gốc, collection = nhóm model). 3 True: SLM phù hợp khi cần tiết kiệm chi phí/hiệu năng thay vì reasoning mạnh nhất. 4 True: video generation model tạo video từ prompt văn bản."},

{id:6, type:"single", text:"A team wants to reduce misinterpretation when a model mixes instructions, reference text, and examples in a long prompt. Which action is most appropriate?",
 options:["Increase temperature to make the response more flexible","Separate sections with clear delimiters such as headings, dividers, or tags","Remove all examples so the prompt is shorter","Place every instruction only at the beginning and never repeat it"],
 correct:1,
 explain:"Dùng delimiter (heading, tag, dấu phân chia) giúp model phân biệt rõ các phần của prompt. Tăng temperature không giải quyết vấn đề cấu trúc; bỏ hết ví dụ có thể mất thông tin hữu ích; chỉ đặt instruction ở đầu có thể giảm hiệu lực trong prompt dài."},

{id:7, type:"fill", text:"Fill in the blanks about model comparison tools.",
 blanks:[
  {prefix:"To compare one specific model against similar options across multiple metrics and datasets, open its model card and select the", options:["benchmarks tab","model leaderboard","fine-tuning pane","deployment wizard"], correct:"benchmarks tab", suffix:"."},
  {prefix:"To compare top models across the catalog by quality, safety, estimated cost, or throughput, start with the", options:["benchmarks tab","model leaderboard","feature gallery","pricing sheet"], correct:"model leaderboard", suffix:"."}
 ],
 explain:"Benchmarks tab dùng để so sánh sâu 1 model cụ thể với các model tương tự. Model leaderboard dùng để so sánh tổng quan nhiều model theo quality/safety/cost/throughput."},

{id:8, type:"multi", text:"A developer is adjusting generation settings for two use cases: factual answers about hotel amenities, and creative itinerary suggestions. Which configuration is the best fit?", note:"Chọn 2 đáp án",
 options:["Use a lower temperature for factual answers","Use the same high temperature for both factual and creative work","Raise both temperature and top P together as the default recommendation","Use a higher temperature for creative suggestions"],
 correct:[0,3],
 explain:"Temperature thấp cho câu trả lời factual (ổn định, chính xác); temperature cao cho gợi ý sáng tạo (đa dạng hơn). Dùng cùng temperature cao cho cả hai hoặc tăng cả temperature+top P cùng lúc không phải cách làm chuẩn."},

{id:9, type:"fill", text:"Fill in the blank about the chat completions API.",
 blanks:[
  {prefix:"To submit the conversation history correctly, the developer must send the prompt as a", options:["collection of message objects in JSON format","set of token summaries","table of SQL records","binary packet stream"], correct:"collection of message objects in JSON format", suffix:"."}
 ],
 explain:"Chat completions API dùng format hội thoại theo message objects (role + content) trong JSON, không phải SQL, XML hay binary."},

{id:10, type:"match", text:"Match each measurement activity to its description (responsible AI measurement workflow).",
 rows:[
   {desc:"Build a broad set of inputs likely to trigger each documented risk.", correct:"Prepare prompts"},
   {desc:"Run the prepared inputs through the solution and capture the generated responses.", correct:"Generate output"},
   {desc:"Use fixed standards to assign each response to a harm category.", correct:"Measure harmful results"},
   {desc:"Record results so they can be reviewed by decision makers.", correct:"Document and share results"}
 ],
 pool:["Prepare prompts","Generate output","Measure harmful results","Document and share results","Randomize production traffic","Replace criteria with intuition"],
 explain:"Thứ tự đo lường rủi ro: chuẩn bị prompt → tạo output → đánh giá theo tiêu chuẩn cố định → ghi lại/chia sẻ kết quả cho người ra quyết định."},

{id:11, type:"tf", text:"For each statement about deployment types, indicate True or False.",
 statements:[
  {text:"Standard deployments are limited to a single region and are suitable when regional data residency compliance is required.", answer:true},
  {text:"Data zone provisioned deployments use reserved provisioned throughput units within a data zone.", answer:true},
  {text:"Global provisioned deployments are built only on a pay-per-token basis.", answer:false},
  {text:"Deployment type availability is identical across all models offered in the Azure AI portal.", answer:false}
 ],
 explain:"1&2 True. 3 False: global provisioned dùng reserved throughput, không phải chỉ pay-per-token. 4 False: các loại deployment hỗ trợ khác nhau tuỳ model, cần kiểm tra riêng."},

{id:12, type:"single", text:"A company wants to fine-tune immediately without measuring how the standard model performs first. What is the strongest reason this is risky?",
 options:["Without a baseline, it is difficult to tell whether fine-tuning improved or degraded performance","Without a baseline, the model cannot be deployed after training","Without a baseline, LoRA cannot be used during fine-tuning","Without a baseline, JSONL files cannot be validated"],
 correct:0,
 explain:"Baseline cho biết hiệu năng model gốc trước khi fine-tune, để có thể so sánh và xác nhận việc fine-tune có cải thiện hay không. Các đáp án khác không liên quan tới rủi ro chính này."},

{id:13, type:"order", text:"Arrange the stages of a responsible generative AI workflow in the correct order.",
 correctOrder:["Map potential harms","Measure harms","Mitigate harms","Manage the solution responsibly"],
 explain:"Trước tiên xác định (map) các rủi ro có thể xảy ra → đo lường (measure) mức độ xảy ra → giảm thiểu (mitigate) bằng biện pháp bảo vệ → cuối cùng quản lý (manage) vận hành liên tục sau khi triển khai."},

{id:14, type:"single", text:"A team wants a generative AI solution that connects to internal systems, applies business rules, and triggers workflows such as creating records or sending commands. Which tool type fits?",
 options:["Code interpreter","File search","Function","Web search"],
 correct:2,
 explain:"Function tool cho phép model gọi hàm nghiệp vụ tuỳ chỉnh trong code để tích hợp hệ thống nội bộ và kích hoạt workflow. File search dùng cho tìm kiếm tài liệu, web search cho internet, code interpreter cho tính toán/Python."},

{id:15, type:"single", text:"A travel chat assistant must stay on travel topics, keep a brand voice, ask for clarification, and format hotel suggestions consistently — with no extra training or infrastructure. Which approach fits best?",
 options:["Retrieval augmented generation","Prompt engineering","Fine-tuning","Model retraining from scratch"],
 correct:1,
 explain:"Prompt engineering cho phép định hình hành vi/giọng văn/format ngay lập tức chỉ bằng hướng dẫn, không cần training hay hạ tầng mới. RAG cần dữ liệu ngoài, fine-tuning/retraining cần thời gian và tài nguyên nhiều hơn."},

{id:16, type:"single", text:"A team needs a numeric representation that preserves meaning so similar passages can be compared mathematically. How is that representation stored?",
 options:["As a bitmap image of the original text","As a compressed archive of source documents","As a vector of floating-point numbers","As a fixed list of keyword tags only"],
 correct:2,
 explain:"Embedding được lưu dưới dạng vector số thực (floating-point), cho phép so sánh ngữ nghĩa bằng toán học. Ảnh bitmap, archive hay keyword tag không cung cấp khả năng này."},

{id:17, type:"single", text:"After supervised fine-tuning with labeled examples, a team wants to further align the model using better-vs-worse response pairs. What is the most appropriate next step?",
 options:["Replace the training set with a single longer system message","Apply direct preference optimization after supervised fine-tuning","Switch from JSONL to CSV so the model can compare preferences","Lower the learning rate to zero so alignment happens during inference"],
 correct:1,
 explain:"Direct Preference Optimization (DPO) áp dụng sau SFT để tinh chỉnh theo cặp phản hồi tốt/kém, giúp alignment tốt hơn theo sở thích con người. Các lựa chọn khác không tạo ra cơ chế alignment này."},

{id:18, type:"single", text:"A quality/safety team succeeds in triggering harmful responses during adversarial testing. What should they do with those results?",
 options:["Discard them after mitigation work begins so future reviews focus only on unresolved issues","Use them only to retrain the model and avoid sharing them with the broader team","Document and review them so the organization can judge how realistically harmful output may occur in practice","Convert them into performance benchmarks for response speed and latency tracking"],
 correct:2,
 explain:"Kết quả kiểm thử đối kháng thành công cần được ghi lại và xem xét để đánh giá rủi ro thực tế và hỗ trợ ra quyết định giảm thiểu, không nên bỏ qua, giữ kín, hay chuyển thành số liệu tốc độ."},

{id:19, type:"single", text:"In content harm evaluation, results are often summarized as a defect rate. What does that represent?",
 options:["The average token count of unsafe responses","The number of prompts per minute sent during testing","The percentage of responses that exceed the selected severity threshold","The percentage of prompts that contain reference answers"],
 correct:2,
 explain:"Defect rate = tỷ lệ % phản hồi vượt ngưỡng mức độ nghiêm trọng (severity threshold) đã chọn, không liên quan tới độ dài token hay tốc độ gửi prompt."},

{id:20, type:"fill", text:"Fill in the blanks about SharePoint connection modes.",
 blanks:[
  {prefix:"For SharePoint content,", options:["SharePoint remote","SharePoint indexed","Web grounding","OneLake"], correct:"SharePoint remote", suffix:"uses real-time queries and automatically respects existing permissions,"},
  {prefix:"while", options:["SharePoint remote","SharePoint indexed","Azure blob storage","local archive"], correct:"SharePoint indexed", suffix:"uses a pre-processed index and can provide faster responses with fuller advanced search capabilities."}
 ],
 explain:"SharePoint remote truy vấn trực tiếp theo thời gian thực và giữ nguyên quyền truy cập gốc. SharePoint indexed dùng index đã xử lý trước, nhanh hơn và hỗ trợ tìm kiếm nâng cao hơn."},

{id:21, type:"tf", text:"For each statement about AI-enabled workflows, indicate True or False.",
 statements:[
  {text:"An AI-enabled workflow can define the path a request follows by connecting functional nodes that process, route, or respond to information.", answer:true},
  {text:"A workflow node must always call an AI agent and cannot perform tasks such as evaluating conditions, transforming data, or interacting with a user.", answer:false},
  {text:"Workflows can support business processes that combine AI reasoning, deterministic logic, and user interaction within a single coordinated flow.", answer:true},
  {text:"Knowledge of workflow design helps architects extend agent-driven systems and understand how requests move through automated processes.", answer:true}
 ],
 explain:"1,3,4 True. 2 False: node không nhất thiết phải gọi AI agent, có thể chỉ xử lý điều kiện, biến đổi dữ liệu, hoặc tương tác người dùng."},

{id:22, type:"match", text:"Match each action (when executing a workflow from code) to its purpose.",
 rows:[
  {desc:"Connects to the Microsoft Foundry project and supports authentication.", correct:"AI project client"},
  {desc:"Provides the conversation context used for workflow execution.", correct:"Conversation"},
  {desc:"Identifies which saved workflow to run.", correct:"Workflow name"}
 ],
 pool:["AI project client","Conversation","Workflow name","Static screenshot","Visual note"],
 explain:"AI project client kết nối và xác thực với Foundry project; Conversation cung cấp context hội thoại; Workflow name xác định workflow cần chạy. Screenshot/note không phải input runtime."},

{id:23, type:"fill", text:"Fill in the blanks about code integration and human-in-the-loop workflows.",
 blanks:[
  {prefix:"When code integration uses", options:["streaming","screenshots","archives","versions"], correct:"streaming", suffix:", the application can receive workflow events in real time,"},
  {prefix:"while a human-in-the-loop workflow may require", options:["additional messages","schemas","archives","screenshots"], correct:"additional messages", suffix:"to resume after a pause."}
 ],
 explain:"Streaming cho phép nhận event workflow theo thời gian thực. Human-in-the-loop workflow có thể cần gửi thêm message để tiếp tục sau khi tạm dừng chờ input người dùng."},

{id:24, type:"single", text:"A developer wants an agent to access tools exposed by a remote MCP server automatically, without manually calling each tool. Which sequence enables automatic tool invocation?",
 options:[
  "Create a manual client session, wrap every tool in async functions, call session.call_tool directly, then serialize results into the prompt",
  "Add the MCP server URL to the system prompt only and the agent will infer the rest without any tool configuration",
  "Invoke the prompt first, then create the MCP tool only if the model asks for external data",
  "Create the MCP tool, apply headers if needed, choose an approval mode, add the tool to the agent, and invoke a prompt"],
 correct:3,
 explain:"Để tool được gọi tự động, cần đăng ký MCP tool trước (headers nếu cần), chọn approval mode, gắn tool vào agent, rồi mới invoke prompt. Các cách khác đòi hỏi gọi tool thủ công hoặc tạo tool quá muộn."},

{id:25, type:"fill", text:"Fill in the blanks about agent sessions and chat message structure.",
 blanks:[
  {prefix:"A conversation that preserves context over time is managed through", options:["agent session","base agent","web search","function tool"], correct:"agent session", suffix:","},
  {prefix:"while the role labels user, assistant, system, and tool belong to the", options:["chat message structure","authentication provider","base agent","function tool"], correct:"chat message structure", suffix:"."}
 ],
 explain:"Agent session duy trì context hội thoại qua thời gian. Chat message structure định nghĩa vai trò (role) của mỗi phần trong hội thoại (user/assistant/system/tool)."},

{id:26, type:"match", text:"Match each handoff orchestration concept to its description.",
 rows:[
  {desc:"Transfers control to the next agent based on task context or user need.", correct:"Handoff orchestration"},
  {desc:"A workflow style in which routing decisions are made after each agent's output.", correct:"Control workflow"},
  {desc:"Converts structured agent output into a typed object used for routing.", correct:"Transformation executor"},
  {desc:"A fallback branch used when no routing condition matches.", correct:"Default case"},
  {desc:"Produces the final workflow result at the end of processing.", correct:"Terminal executor"}
 ],
 pool:["Handoff orchestration","Control workflow","Transformation executor","Default case","Terminal executor","Concurrent builder","Agent session"],
 explain:"Handoff orchestration = chuyển giao giữa agent; Control workflow = quyết định routing sau mỗi bước; Transformation executor = chuyển output thành object có kiểu; Default case = nhánh dự phòng; Terminal executor = tạo kết quả cuối cùng."},

{id:27, type:"single", text:"A team struggles to keep an agent aligned with a growing set of external tools; every change requires manual code updates. What capability solves this?",
 options:["Dynamic tool discovery","Static API pinning","Manual wrapper generation","Local-only tool execution"],
 correct:0,
 explain:"Dynamic tool discovery cho phép agent tìm tool khả dụng tại runtime, giảm việc phải sửa code mỗi khi tool thay đổi."},

{id:28, type:"tf", text:"For each statement about dynamic tool discovery, indicate True or False.",
 statements:[
  {text:"When dynamic tool discovery is used, tools can be added or updated centrally without changing the agent code.", answer:true},
  {text:"Agents using dynamic tool discovery are limited to older versions of tools because the discovery process cannot reflect changes at runtime.", answer:false},
  {text:"Centralizing tool management can reduce duplication and lower the chance of management errors.", answer:true},
  {text:"Dynamic tool discovery is least useful in environments where tools and services change frequently.", answer:false}
 ],
 explain:"1&3 True. 2 False: discovery phản ánh thay đổi tại runtime, không bị giới hạn bản cũ. 4 False: nó lại đặc biệt hữu ích trong môi trường thay đổi thường xuyên."},

{id:29, type:"order", text:"Arrange the steps of MCP tool integration for an Azure AI agent in the correct order.",
 correctOrder:["The MCP client connects to the MCP server",
 "The MCP client retrieves available tool definitions with session.list_tools",
 "Each discovered tool is wrapped in an async function that calls session.call_tool",
 "The wrapped functions are bundled into a function tool and registered to the agent's tool set"],
 explain:"Kết nối server → lấy danh sách tool (list_tools) → bọc từng tool bằng async function (call_tool) → gộp lại thành function tool và đăng ký cho agent."},

{id:30, type:"single", text:"What is the main long-term value of MCP-based integration as the ecosystem expands?",
 options:["It enables richer and more dynamic agent solutions by making it easier to bring specialized tools into workflows","It locks the agent into a fixed set of built-in functions so behavior remains predictable","It removes the need for contextual data by forcing all reasoning to happen inside the base model only","It prevents future expansion because each additional server reduces agent flexibility"],
 correct:0,
 explain:"MCP giúp agent tích hợp linh hoạt các tool chuyên biệt theo thời gian, làm agent mạnh và linh hoạt hơn — ngược lại với việc giới hạn hay ngăn mở rộng."},

{id:31, type:"single", text:"A developer wants switch-based routing for specialist handoff without rewriting the same branching pattern for each classification value. What is the best design choice?",
 options:["Use one terminal executor to decide all future routing after the workflow ends","Skip condition checks and send every request to the default branch first","Require all specialists to run before any routing decision is made","Create factory functions that generate condition checkers for each classification value"],
 correct:3,
 explain:"Factory function tạo ra logic điều kiện tái sử dụng cho từng giá trị phân loại, tránh viết lại code branching nhiều lần."},

{id:32, type:"tf", text:"For each statement about A2A (agent-to-agent) hosting, indicate True or False.",
 statements:[
  {text:"Hosting an A2A agent allows external callers to send requests over HTTP for real-time interaction.", answer:true},
  {text:"A request handler can route a cancellation request to the appropriate runtime method.", answer:true},
  {text:"Only advanced agents need a task store because simple agents do not need reliable interaction handling.", answer:false},
  {text:"An authenticated audience may be given an extended version of the agent card.", answer:true}
 ],
 explain:"1,2,4 True. 3 False: cả agent đơn giản cũng cần task store để theo dõi task ổn định."},

{id:33, type:"single", text:"A product lead wants to test an agent idea quickly via forms (not code), and let non-technical stakeholders review the configuration in a shared interface. Which approach fits best?",
 options:["Visual Studio Code with direct YAML editing","A local script-based workflow with no shared interface","The Foundry portal","A custom command line tool chain"],
 correct:2,
 explain:"Foundry portal cung cấp giao diện web trực quan, dễ cấu hình bằng form và chia sẻ để người không kỹ thuật xem xét — phù hợp hơn VS Code, script cục bộ, hay CLI."},

{id:34, type:"multi", text:"An organization is building custom tools for an AI agent to support internal workflows. What benefits should the team expect?", note:"Chọn 3 đáp án",
 options:["Improved accuracy through more consistent outputs","Enhanced productivity through automation of repetitive work","Guaranteed removal of all decision-making from the agent","Tailored solutions for business specific processes","Permanent elimination of the need for employees"],
 correct:[0,1,3],
 explain:"Custom tools cải thiện độ chính xác, tăng năng suất qua tự động hoá, và tạo giải pháp phù hợp riêng cho doanh nghiệp. Nó không loại bỏ hoàn toàn việc ra quyết định của agent, cũng không thay thế hoàn toàn con người."},

{id:35, type:"single", text:"Which stage of the RAG workflow combines retrieved material with the user's request before generating a reply?",
 options:["Retrieve","Augment","Generate","Train"],
 correct:1,
 explain:"Retrieve = tìm thông tin liên quan; Augment = kết hợp thông tin đó với câu hỏi gốc; Generate = tạo câu trả lời cuối; Train không thuộc pipeline RAG runtime."},

{id:36, type:"single", text:"What feature lets a team review earlier workflow states, compare modifications, and roll back to a previous state?",
 options:["Basic chat","Versioning","For each","Parse value"],
 correct:1,
 explain:"Versioning lưu các trạng thái trước đó của workflow, cho phép so sánh và khôi phục. Các lựa chọn khác không liên quan tới lịch sử/rollback."},

{id:37, type:"single", text:"Which description best matches a framework where agents interact with users, APIs, and external services while supporting tools, conversation history, and collaboration across specialized agents?",
 options:["A rules-only automation engine that avoids model-based reasoning","A framework for building AI agents with structured workflows and extensible capabilities","A reporting platform limited to dashboards and scheduled exports","A data storage service designed only for archiving chat transcripts"],
 correct:1,
 explain:"Đây chính là định nghĩa của một agent framework: hỗ trợ reasoning theo model, workflow có cấu trúc, tool, lịch sử hội thoại, và hợp tác đa agent."},

{id:38, type:"single", text:"A workflow must send a request to an AI component that may return either plain language or structured JSON output for later steps. Which node type should be used?",
 options:["End","Basic chat","Invoke","Flow"],
 correct:2,
 explain:"Invoke gọi trực tiếp AI agent/component và có thể nhận về text thường hoặc JSON có cấu trúc để bước sau xử lý. End kết thúc workflow, Basic chat cho hội thoại người dùng, Flow quản lý luồng điều khiển."},

{id:39, type:"single", text:"Why is sequential orchestration a suitable choice for a fixed-order, multi-stage pipeline with predictable stage behavior and pre-planned failure handling?",
 options:["Because sequential orchestration works well when stage behavior is predictable and step-level delays or failures can be managed within an ordered pipeline","Because sequential orchestration is intended only for workflows where all stages run independently at the same time","Because sequential orchestration requires every agent to dynamically choose the next stage during execution","Because sequential orchestration avoids the need to define roles for agents in advance"],
 correct:0,
 explain:"Sequential orchestration phù hợp khi các stage có vai trò rõ ràng, chạy theo thứ tự cố định và lỗi/độ trễ ở từng bước có thể được xử lý riêng — không phải chạy song song hay chọn stage động."},

{id:40, type:"match", text:"Match each Azure Language access method/concept to its description.",
 rows:[
  {desc:"Sends service calls as JSON payloads over the API interface.", correct:"REST interface"},
  {desc:"Uses the running application's default Azure identity context for authentication.", correct:"Default Azure credential"},
  {desc:"Creates a credential object directly from a resource key value.", correct:"Azure key credential"},
  {desc:"Acts as the Python client used to submit text analysis requests.", correct:"Text analytics client"}
 ],
 pool:["REST interface","Default Azure credential","Azure key credential","Text analytics client","Microsoft Entra tenant creation","Blob container client"],
 explain:"REST interface = gọi qua HTTP/JSON trực tiếp; Default Azure credential = dùng identity mặc định của ứng dụng; Azure key credential = tạo từ resource key; Text analytics client = SDK Python để gọi Azure Language."},

{id:41, type:"tf", text:"For each statement about Azure AI Language, indicate True or False.",
 statements:[
  {text:"Azure AI Language can identify the language used in both brief text strings and larger document-style inputs.", answer:true},
  {text:"A higher confidence score in a language detection response means the service has less certainty about the detected language.", answer:false},
  {text:"When a request contains multiple text records, each record should include a unique ID so its result can be matched to the correct input.", answer:true},
  {text:"When Azure AI Language cannot determine a language with sufficient reliability, the response can identify the language and ISO code as unknown and return a confidence score of zero.", answer:true}
 ],
 explain:"1,3,4 True. 2 False: confidence score cao nghĩa là độ chắc chắn cao hơn, không phải thấp hơn."},

{id:42, type:"multi", text:"Which situations are good candidates for adding language detection?", note:"Chọn 2 đáp án",
 options:["A storage system needs to compress text so each document stays under the character limit before submission","A reporting service needs to increase the maximum number of documents allowed in a request beyond 1,000 items","A content repository accepts free-form text from many sources and the language of each entry is not known in advance","A chat application needs to determine a user's language at the beginning of a conversation so replies can be configured appropriately"],
 correct:[2,3],
 explain:"Language detection hữu ích khi ngôn ngữ đầu vào chưa biết trước (repository đa nguồn) hoặc cần xác định ngôn ngữ người dùng để cấu hình phản hồi phù hợp (chat app). Nó không liên quan tới nén văn bản hay tăng giới hạn số document."},

{id:43, type:"multi", text:"A product team must convert recorded meeting audio into written notes and generate spoken playback of written responses. Which two capabilities should they prioritize?", note:"Chọn 2 đáp án",
 options:["Speech-to-text transcription","Image classification","Text-to-speech synthesis","Object detection"],
 correct:[0,2],
 explain:"Speech-to-text chuyển audio thành văn bản (ghi chú cuộc họp); Text-to-speech tạo giọng nói từ văn bản (playback). Image classification/object detection là năng lực thị giác, không liên quan."},

{id:44, type:"fill", text:"Fill in the blanks about speech recognition result properties.",
 blanks:[
  {prefix:"When speech recognition succeeds, the reason property has the value", options:["recognized speech","canceled","duration","properties"], correct:"recognized speech", suffix:","},
  {prefix:"and the transcription is available in", options:["text","offset","ticks","properties"], correct:"text", suffix:"."}
 ],
 explain:"Khi nhận diện thành công, reason = 'RecognizedSpeech' và nội dung transcript nằm trong thuộc tính text."},

{id:45, type:"fill", text:"Fill in the blanks about batch transcription configuration.",
 blanks:[
  {prefix:"The audio input for the request can be provided from a", options:["publicly accessible URL","local keyboard input","fixed binary mode","interactive sign-in tokens"], correct:"publicly accessible URL", suffix:"or from"},
  {prefix:"", options:["Azure blob storage with a SAS URL","encrypted database rows","local keyboard input","interactive sign-in tokens"], correct:"Azure blob storage with a SAS URL", suffix:","},
  {prefix:"and the transcription output can be requested in either", options:["simple","fixed binary","encrypted","local"], correct:"simple", suffix:"or"},
  {prefix:"", options:["detailed","interactive","encrypted","fixed"], correct:"detailed", suffix:"format."}
 ],
 explain:"Audio input có thể là URL công khai hoặc Azure Blob Storage với SAS URL. Output format có thể là simple hoặc detailed."},

{id:46, type:"single", text:"A developer sends two short documents, 'Hello world' and 'Bonjour', for language detection. What result pattern should the developer expect?",
 options:["Both documents return the same language because short inputs cannot be differentiated reliably","The first document is identified correctly but the second fails because non-English text requires a separate request","The first document is identified as English and the second as French, with a result returned for each document","Both documents return unknown because short greetings do not contain enough text for any prediction"],
 correct:2,
 explain:"Azure AI Language xử lý nhiều record trong 1 request và trả kết quả riêng cho từng record. Document 1 -> English, document 2 -> French."},

{id:47, type:"single", text:"A healthcare organization needs to share patient notes with an external analytics team while reducing privacy risk. Which Azure Language capability is most appropriate?",
 options:["Named entity recognition for locations only","Language detection with ISO code output","PII detection and redaction","Keyphrase extraction for summaries"],
 correct:2,
 explain:"PII detection and redaction xác định và ẩn/xoá thông tin cá nhân nhạy cảm trước khi chia sẻ — đúng mục tiêu giảm rủi ro riêng tư. Các lựa chọn khác không tập trung vào bảo vệ dữ liệu cá nhân."},

{id:48, type:"multi", text:"A team wants to use SSML markup to improve naturalness and precision of spoken output. Which three tasks can SSML handle directly?", note:"Chọn 3 đáp án",
 options:["Create a speech recognizer","Insert recorded audio into the output","Adjust prosody such as pitch and speaking rate","Specify phonetic pronunciation for a term"],
 correct:[1,2,3],
 explain:"SSML có thể chèn audio đã ghi sẵn, điều chỉnh prosody (pitch, rate), và chỉ định phát âm ngữ âm cho từ khó. Tạo speech recognizer thuộc về speech-to-text, không phải SSML (dùng cho synthesis)."},

{id:49, type:"single", text:"A solution architect is selecting a resource type for an application using the Voice Live API, needing the broadest feature support with strong Microsoft Foundry integration. Why choose Microsoft Foundry resources?",
 options:["They are required because the service only supports project-based endpoints","They are mandatory for using PCM16 audio while other resources only support G711 A-law","They are recommended because they provide full feature availability and the best Microsoft Foundry integration experience","They are the only option that supports text responses without audio"],
 correct:2,
 explain:"Microsoft Foundry resources được đề xuất vì cung cấp đầy đủ tính năng và tích hợp tốt nhất với Foundry, không phải vì lý do endpoint hay audio format bắt buộc."},

{id:50, type:"single", text:"A developer wants to populate a language picker dynamically from the service instead of a hard-coded list. What can the supported languages query return?",
 options:["A fixed list of document file extensions","Only the count of available languages","A list containing language display names and ISO codes","Only the languages currently enabled in the Foundry portal playground"],
 correct:2,
 explain:"Supported languages query trả về danh sách tên ngôn ngữ hiển thị cùng mã ISO, phù hợp để xây dropdown động — không phải chỉ số lượng hay danh sách file extension."},

{id:51, type:"single", text:"A design team wants to create a brand new promotional image from a written description instead of searching a stock photo library. Which model capability fits?",
 options:["Classifying uploaded images into predefined categories","Summarizing image metadata into natural language text","Retrieving an existing image from a curated catalog based on keyword similarity","Generating original graphical output from natural language prompts"],
 correct:3,
 explain:"Image generation model tạo ảnh mới hoàn toàn từ prompt văn bản. Các lựa chọn khác là classification, metadata summarization, hoặc image search — không tạo ảnh mới."},

{id:52, type:"tf", text:"For each statement about image generation, indicate True or False.",
 statements:[
  {text:"A client application can use an SDK to submit a prompt to an image generation model.", answer:true},
  {text:"An image generation response may return encoded image data that must be decoded before the image is saved to a file.", answer:true},
  {text:"The size parameter can be used in an image generation request to specify the dimensions of the output image.", answer:true},
  {text:"To save a generated image, the application must write the prompt text itself to the image file.", answer:false}
 ],
 explain:"1,2,3 True. 4 False: file ảnh lưu dữ liệu ảnh đã tạo, không phải văn bản prompt."},

{id:53, type:"fill", text:"Fill in the blanks about monitoring asynchronous video generation jobs.",
 blanks:[
  {prefix:"If a video job fails, the developer should review", options:["video.error","video.prompt","video.status","video.id"], correct:"video.error", suffix:"to identify the cause."},
  {prefix:"After a job finishes successfully, the generated video remains available to download for", options:["24 hours","1 hour","7 days","unlimited time"], correct:"24 hours", suffix:"."},
  {prefix:"The service also limits concurrent video creation so that only", options:["two","one","five","ten"], correct:"two", suffix:"jobs can run at the same time."}
 ],
 explain:"video.error chứa thông tin chẩn đoán khi job thất bại. Video hoàn tất có thể tải trong 24 giờ. Giới hạn đồng thời là 2 job video cùng lúc."},

{id:54, type:"single", text:"A client application submits a POST request to start analysis and receives a status 'not started' with an operation ID. What should the application do next?",
 options:["Resubmit the same POST request until the final results are returned","Send a GET request to the analyzer results endpoint by using the operation ID","Delete the analyzer and rebuild it before checking status","Change the Microsoft Foundry endpoint after every request"],
 correct:1,
 explain:"Vì phân tích là bất đồng bộ, ứng dụng cần dùng operation ID để gửi GET request tới endpoint kết quả và theo dõi trạng thái, không phải gửi lại POST hoặc xoá/tạo lại analyzer."},

{id:55, type:"match", text:"Match each analyzer definition element to its description.",
 rows:[
  {desc:"Identifies the pre-built analyzer that a custom analyzer builds on top of.", correct:"Base analyzer ID"},
  {desc:"Defines the fields the analyzer should extract or generate.", correct:"Field schema"},
  {desc:"Specifies whether detailed output should be returned.", correct:"Config"},
  {desc:"Lists the generative models used during processing.", correct:"Models"},
  {desc:"Stores metadata that explains the purpose of the analyzer.", correct:"Description"}
 ],
 pool:["Base analyzer ID","Field schema","Config","Models","Description","API version","Operation-location"],
 explain:"Base analyzer ID = analyzer nền; Field schema = định nghĩa field trích xuất; Config = cấu hình output; Models = model dùng xử lý; Description = mô tả mục đích analyzer."},

{id:56, type:"order", text:"Arrange the flow for persisting enriched information (Azure AI Search knowledge store) in the correct order.",
 correctOrder:["Define a knowledge store in the skill set","Run the indexer and enrichment pipeline","Generate projections from the enriched data","Persist the projections in the knowledge store"],
 explain:"Định nghĩa knowledge store trước → chạy indexer/enrichment pipeline → tạo projection từ dữ liệu đã enrich → lưu (persist) projection vào knowledge store."},

{id:57, type:"multi", text:"A team is preparing to deploy a video generation model in Microsoft Foundry. Which three prerequisites must be in place before deployment can start?", note:"Chọn 3 đáp án",
 options:["A collection of training videos uploaded to blob storage","An Azure subscription","A Foundry project with permission to deploy models","A preconfigured video endpoint running in Azure AI services","A Microsoft Foundry portal account or access to the portal"],
 correct:[1,2,4],
 explain:"Cần: Azure subscription, Foundry project có quyền deploy model, và quyền truy cập Foundry portal. Không cần training video có sẵn (đây là model catalog, không train mới) hay endpoint dựng sẵn (endpoint tạo trong lúc deploy)."},

{id:58, type:"multi", text:"In Content Understanding Studio, what can be reviewed during testing before committing to a final build?", note:"Chọn 2 đáp án",
 options:["Extracted field values","Operating system logs from the client device","JSON output returned to client applications","Role assignments for the resource group"],
 correct:[0,2],
 explain:"Trong lúc test, có thể xem giá trị field được trích xuất và JSON output mà client sẽ nhận được. OS logs và role assignment không liên quan tới việc validate extraction."},

{id:59, type:"multi", text:"Which items are examples of layout-oriented information rather than schema field values in a document analysis response?", note:"Chọn 3 đáp án",
 options:["Words","API version","Lines","Analyzer ID","Paragraphs"],
 correct:[0,2,4],
 explain:"Words, Lines, Paragraphs là thông tin về layout/cấu trúc trang (OCR). API version và Analyzer ID là metadata của service/operation, không phải layout."},

{id:60, type:"single", text:"A records team needs a model that extracts printed and handwritten text, detects the language of each text line, and works on documents without a predictable structure. Which model should they choose?",
 options:["Invoice model","Read model","Layout model","Contract model"],
 correct:1,
 explain:"Read model chuyên trích xuất text in/viết tay và phát hiện ngôn ngữ theo từng dòng, phù hợp với tài liệu không có cấu trúc cố định. Invoice/Contract model dành cho loại tài liệu cụ thể; Layout model thêm cấu trúc (table, selection mark) nhưng yêu cầu chính ở đây là đọc text tổng quát."}
];
