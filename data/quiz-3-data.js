/* =========================================================
   AI-103 Quiz 3 — 60 câu hỏi (Microsoft Foundry, agents, orchestration,
   speech, language, content understanding)
   type: single | multi | tf | match | order | fill
   ========================================================= */
const quizData = [
{id:1, type:"match", text:"Match each Microsoft Foundry concept to its description.",
 rows:[
  {desc:"A web-based visual interface for working with AI projects.", correct:"Microsoft Foundry Portal"},
  {desc:"A programmable interface used to automate creation and management tasks.", correct:"Microsoft Foundry SDK"},
  {desc:"The container that holds resource connections, data, code, and other solution elements.", correct:"Microsoft Foundry Project"},
  {desc:"The Azure-level parent resource that provides compute, storage, AI tools, and related services.", correct:"Microsoft Foundry Resource"},
  {desc:"A central MCP-based connection that simplifies access to multiple knowledge sources.", correct:"Foundry IQ"}
 ],
 pool:["Microsoft Foundry Portal","Microsoft Foundry SDK","Microsoft Foundry Project","Microsoft Foundry Resource","Foundry IQ"],
 explain:"Portal = giao diện web trực quan; SDK = giao diện code để tự động hoá; Project = workspace chứa connection/data/code; Resource = tài nguyên Azure cấp cao cung cấp compute/storage/AI tools; Foundry IQ = kết nối MCP tập trung tới nhiều nguồn kiến thức."},

{id:2, type:"fill", text:"Fill in the blanks about Foundry SDKs.",
 blanks:[
  {prefix:"To connect code to Foundry projects and work with assets such as agents and Foundry IQ knowledge stores, use the", options:["Microsoft Foundry SDK","Foundry Tools SDKs","GitHub repository","Azure policy initiative"], correct:"Microsoft Foundry SDK", suffix:"."},
  {prefix:"To consume Foundry Tools resources through service-specific libraries or REST interfaces, use", options:["Foundry Tools SDKs","Microsoft Foundry SDK","GitHub repository","Azure policy initiative"], correct:"Foundry Tools SDKs", suffix:"."}
 ],
 explain:"Microsoft Foundry SDK dùng để kết nối code trực tiếp với project (agent, Foundry IQ). Foundry Tools SDKs dùng để gọi các tool resource cụ thể qua library/REST. GitHub repo chỉ lưu code, Azure policy chỉ quản lý governance."},

{id:3, type:"match", text:"Match each benchmark dataset to its description.",
 rows:[
  {desc:"Evaluates reasoning ability with difficult benchmark tasks.", correct:"BIG-Bench Hard"},
  {desc:"Evaluates performance on graduate-level questions drawn from multiple disciplines.", correct:"GPQA"},
  {desc:"Evaluates broad general knowledge.", correct:"MMLU-Pro"},
  {desc:"Evaluates how well a model follows instructions.", correct:"IFEval"}
 ],
 pool:["BIG-Bench Hard","GPQA","MMLU-Pro","IFEval","HarmBench","ToxiGen"],
 explain:"BIG-Bench Hard đo reasoning khó; GPQA đo câu hỏi trình độ cao học nhiều lĩnh vực; MMLU-Pro đo kiến thức tổng quát; IFEval đo khả năng tuân theo hướng dẫn. HarmBench/ToxiGen dùng cho đánh giá an toàn, không thuộc nhóm benchmark chất lượng này."},

{id:4, type:"fill", text:"Fill in the blanks about enabling web retrieval in a Foundry request.",
 blanks:[
  {prefix:"To let a model retrieve fresh information from the public internet during inference, the correct tool name is", options:["web search preview","web search","static","code interpreter"], correct:"web search preview", suffix:","},
  {prefix:"and the capability is most useful for answering", options:["current questions","static questions","code questions","translation questions"], correct:"current questions", suffix:"."}
 ],
 explain:"Tên tool chính xác trong Foundry là 'web search preview'. Nó hữu ích nhất cho các câu hỏi cần thông tin mới (giá cả, sự kiện gần đây...). 'web search' chỉ là tên gọi chung, không phải tên tool cụ thể; 'static' không cần truy xuất internet; 'code interpreter' dùng để chạy code."},

{id:5, type:"tf", text:"For each statement about RAG and fine-tuning, indicate True or False.",
 statements:[
  {text:"A retrieval augmented application can improve factual reliability by retrieving relevant external information at the time a user submits a prompt.", answer:true},
  {text:"A production-ready AI solution must combine prompt engineering, retrieval augmented generation, and fine-tuning in every implementation.", answer:false},
  {text:"An iterative optimization approach can reduce avoidable cost and architectural complexity by introducing additional techniques only when they are justified.", answer:true},
  {text:"Fine-tuning and retrieval augmented generation are interchangeable approaches because both address the same design objective.", answer:false}
 ],
 explain:"1&3 True: RAG cải thiện độ tin cậy factual bằng cách lấy thông tin ngoài tại thời điểm hỏi; tối ưu theo kiểu lặp lại (chỉ thêm kỹ thuật khi cần) giúp giảm chi phí/độ phức tạp không cần thiết. 2 False: không phải giải pháp nào cũng cần cả 3 kỹ thuật, còn tuỳ workload. 4 False: fine-tuning và RAG giải quyết 2 vấn đề khác nhau (hành vi model vs kiến thức ngoài)."},

{id:6, type:"tf", text:"For each statement about responsible generative AI, indicate True or False.",
 statements:[
  {text:"Generative AI can create new content that may closely resemble material produced by a human.", answer:true},
  {text:"A responsible generative AI process begins by applying mitigations before identifying possible harms.", answer:false},
  {text:"Measuring harms involves checking generated outputs to see whether identified risks appear in practice.", answer:true},
  {text:"Managing a generative AI solution responsibly can include deployment and operational readiness planning.", answer:true}
 ],
 explain:"1,3,4 True. 2 False: quy trình đúng phải bắt đầu bằng việc xác định (identify) rủi ro trước, rồi mới đo lường và áp dụng biện pháp giảm thiểu — không làm ngược lại."},

{id:7, type:"tf", text:"For each statement about generation parameters, indicate True or False.",
 statements:[
  {text:"Temperature is used to influence the balance between creativity and consistency in generated output.", answer:true},
  {text:"Max tokens controls response length limits.", answer:true},
  {text:"Top P is unrelated to generation behavior and cannot be adjusted in the playground.", answer:false},
  {text:"The code tab can provide sample request code in languages such as Python, C#, and JavaScript.", answer:true}
 ],
 explain:"1,2,4 True. 3 False: Top P là tham số có thể điều chỉnh được và ảnh hưởng trực tiếp tới cách model sample token, không phải không liên quan."},

{id:8, type:"single", text:"A developer is building a Python application that must connect to an Azure AI Foundry project by using the default credential chain available in the Azure SDK. Which implementation approach should the developer use to create the project client?",
 options:["Create an Azure OpenAI client without specifying any endpoint information","Create an OpenAI client by providing only an API key and a local file path","Create an AI project client by providing a project endpoint and default Azure credential","Create an AI project client by supplying only a deployment name and a model temperature value"],
 correct:2,
 explain:"Cần AI project client với project endpoint (biết kết nối tới project nào) và default Azure credential (dùng chuỗi xác thực mặc định của Azure SDK: managed identity, Azure CLI login, v.v.). Thiếu endpoint hoặc chỉ dùng API key/deployment name+temperature không đủ để tạo client xác thực đúng."},

{id:9, type:"single", text:"A developer needs an API that remains compatible with a widely used conversational API across different generative AI environments, even though a newer approach is preferred for most new projects. Which API is the best fit?",
 options:["Responses API","Chat completions API","Embeddings API","Audio transcriptions API"],
 correct:1,
 explain:"Chat completions API được dùng rộng rãi và tương thích đa nền tảng, phù hợp khi yêu cầu chính là tính tương thích. Responses API mới hơn nhưng không phải yêu cầu ở đây. Embeddings API dùng cho vector hoá nội dung, Audio transcriptions API dùng để chuyển giọng nói thành văn bản — cả hai không phải API hội thoại."},

{id:10, type:"multi", text:"A company is preparing data for grounded retrieval in a Microsoft-based AI solution. Which three sources can be used to supply that data?", note:"Chọn 3 đáp án",
 options:["Azure Virtual Network","Azure Blob Storage","Azure Data Lake Storage Gen2","Microsoft OneLake"],
 correct:[1,2,3],
 explain:"Blob Storage, Data Lake Storage Gen2, và OneLake đều có thể chứa nội dung được index và dùng cho retrieval. Azure Virtual Network là dịch vụ mạng, không phải nguồn dữ liệu để index/tìm kiếm."},

{id:11, type:"multi", text:"A team is evaluating whether a proposed system should be classified as generative AI. Which two statements describe core characteristics of such a system?", note:"Chọn 2 đáp án",
 options:["It is limited to reproducing stored examples exactly as they appeared in training","It only analyzes structured database records and does not create original output","It can be used in applications built by developers","It relies on machine learning models trained on large amounts of internet-sourced data"],
 correct:[2,3],
 explain:"Generative AI có thể được dùng như một capability trong ứng dụng do developer xây (chatbot, trợ lý viết...) và dựa trên model học từ lượng lớn dữ liệu internet. Nó không chỉ sao chép nguyên văn dữ liệu training, và không chỉ phân tích dữ liệu có cấu trúc mà không tạo nội dung mới."},

{id:12, type:"order", text:"Arrange the steps in a harm mapping workflow for a generative AI solution in the correct order.",
 correctOrder:["Identify potential harms","Prioritize identified harms","Test and verify prioritized harms","Document and share verified harms"],
 explain:"Xác định rủi ro có thể xảy ra → ưu tiên theo mức độ nghiêm trọng/khả năng xảy ra → kiểm tra/xác minh các rủi ro đã ưu tiên → ghi lại và chia sẻ kết quả đã xác minh."},

{id:13, type:"single", text:"A team wants a quick way to identify the strongest candidates for a customer support assistant before examining any one model in detail, ranking options by quality, safety, estimated cost, and throughput. Where should they start?",
 options:["Open a single model card and review supported languages","Use the model leaderboard in the portal","Inspect deployment endpoints for one short-listed model","Review feature support for structured output only"],
 correct:1,
 explain:"Model leaderboard được thiết kế để so sánh nhiều model cùng lúc theo quality/safety/cost/throughput — đúng nhu cầu tìm ứng viên tốt nhất trước khi đi sâu. Model card chỉ hữu ích khi đã chọn 1 model cụ thể; endpoint và structured output support chỉ là khía cạnh hẹp, không đủ để so sánh tổng quan."},

{id:14, type:"single", text:"A team is evaluating open-ended creative responses where many different outputs could still be acceptable. Which statement best describes the suitability of reference-based NLP metrics for that situation?",
 options:["They replace the need for all manual and AI-assisted evaluation","They become mandatory whenever system prompts are used","They are always the best choice because creativity increases n-gram overlap","They are less suitable because many valid answers may exist even when there is no single definitive reference response"],
 correct:3,
 explain:"Reference-based metrics so khớp với 1 câu trả lời tham chiếu cố định — không phù hợp khi có nhiều câu trả lời sáng tạo đều hợp lệ. Nó không thay thế hoàn toàn đánh giá thủ công/AI, không bắt buộc khi dùng system prompt, và tính sáng tạo thường làm giảm chứ không tăng độ trùng khớp từ ngữ (n-gram overlap)."},

{id:15, type:"single", text:"A product analyst wants an AI assistant to compare current subscription prices and recently announced features across several vendors, grounded in public sources that may have changed recently. Which tool choice best fits?",
 options:["Use a file retrieval tool tied only to previously uploaded internal documents","Use a web retrieval tool so the model can search public sources at runtime","Use a Python execution tool so the model can compute without external information","Use a custom function tool only without any retrieval capability"],
 correct:1,
 explain:"Vì thông tin giá/tính năng có thể thay đổi thường xuyên, cần web retrieval tool để tìm kiếm nguồn công khai tại thời điểm hỏi. File retrieval chỉ giới hạn ở tài liệu nội bộ đã upload, Python execution chỉ tính toán không lấy thông tin mới, custom function không có khả năng retrieval nên không grounding được câu trả lời."},

{id:16, type:"single", text:"A request uses a web-enabled tool during response generation. What is the correct sequence of events?",
 options:["The model always searches first, then decides whether the question needed current information","The user must manually browse the internet and paste sources back before the model can continue","The model retrieves uploaded files, converts them into web pages, and then produces an answer","The request includes a web tool, the model decides whether fresh data is needed, search results are reviewed, and the findings are synthesized into the reply"],
 correct:3,
 explain:"Trình tự đúng: tool web được cung cấp trong request → model tự quyết định có cần dữ liệu mới không → nếu cần thì tìm và xem kết quả → tổng hợp thành câu trả lời. Model không luôn tìm trước, người dùng không cần tự browse thủ công, và đây không phải là chuyển file upload thành web page."},

{id:17, type:"single", text:"A team already uses detailed prompts, but the assistant still struggles because it lacks access to the company's hotel catalog and cannot reliably answer catalog-specific questions. What is the clearest reason prompt engineering alone is no longer sufficient?",
 options:["The assistant needs a larger user message","The model lacks the required information at generation time","The team forgot to add assistant messages","The model should always use the highest possible temperature"],
 correct:1,
 explain:"Prompt engineering chỉ định hình hành vi, không thể cấp cho model kiến thức nó không truy cập được — ở đây model thiếu dữ liệu catalog thực tế tại thời điểm sinh câu trả lời. Viết message dài hơn, thêm assistant message, hay tăng temperature đều không giải quyết được việc thiếu dữ liệu."},

{id:18, type:"single", text:"A travel company wants every answer to follow its brand voice and formatting rules, but wants to avoid sending a long instruction block and many examples with every request. What is the main advantage of fine-tuning in this situation?",
 options:["It stores all company documents so retrieval is no longer needed","It embeds desired response patterns into the model, reducing prompt length","It guarantees perfect accuracy for any factual question","It prevents the need for future model updates or retraining"],
 correct:1,
 explain:"Fine-tuning giúp model 'học' sẵn giọng văn/format mong muốn, nên không cần lặp lại hướng dẫn dài mỗi lần gọi. Nó không lưu trữ tài liệu công ty (đó là RAG), không đảm bảo chính xác factual tuyệt đối, và vẫn có thể cần cập nhật/retrain sau này."},

{id:19, type:"match", text:"Match each workflow event type to its meaning.",
 rows:[
  {desc:"The workflow finished running and returned its final response.", correct:"response.completed"},
  {desc:"An individual output item such as a workflow action finished.", correct:"response.output_item.done"}
 ],
 pool:["response.completed","response.output_item.done","conversation.created","workflow YAML saved"],
 explain:"response.completed báo toàn bộ workflow đã chạy xong và trả kết quả cuối. response.output_item.done báo một item cụ thể (ví dụ 1 action) đã hoàn tất — chi tiết hơn. 'conversation.created' là tạo hội thoại, 'workflow YAML saved' là lưu file thiết kế — không liên quan tới việc hoàn tất thực thi."},

{id:20, type:"tf", text:"For each statement about integrating workflows into code, indicate True or False.",
 statements:[
  {text:"A workflow saved in a project can be invoked from code by using its name.", answer:true},
  {text:"AI project client is used to establish project access and support authenticated workflow execution.", answer:true},
  {text:"Streaming workflow events can help an application react to workflow state while execution is still in progress.", answer:true},
  {text:"Integrating workflows into code is limited to user-facing web interfaces and cannot support APIs, batch jobs, or automated testing.", answer:false}
 ],
 explain:"1,2,3 True. 4 False: workflow code integration hỗ trợ cả web app, API, microservice, batch job, automated testing — không chỉ giới hạn ở web interface."},

{id:21, type:"fill", text:"Fill in the blanks about group chat orchestration.",
 blanks:[
  {prefix:"A custom conversation controller can be created by extending", options:["group chat manager","group chat builder","agent session","workflow output event"], correct:"group chat manager", suffix:","},
  {prefix:"and the workflow itself is assembled by using", options:["group chat builder","group chat manager","agent session","run stream"], correct:"group chat builder", suffix:"."}
 ],
 explain:"Group chat manager là base class để tuỳ biến logic điều khiển hội thoại nhóm (turn, termination...). Group chat builder dùng để lắp ráp workflow group chat đã được quản lý. Agent session chỉ lưu context hội thoại, không phải base class điều khiển."},

{id:22, type:"fill", text:"Fill in the blanks about control workflow routing.",
 blanks:[
  {prefix:"In a control workflow for dynamic routing, conditions are paired with", options:["case objects","agent session","participants","workflow output event"], correct:"case objects", suffix:","},
  {prefix:"and a", options:["default case","run stream","participants","workflow output event"], correct:"default case", suffix:"should be included to handle unexpected routing outcomes."}
 ],
 explain:"Case object gắn điều kiện với nhánh xử lý cụ thể (switch-case). Default case là nhánh dự phòng khi không điều kiện nào khớp. Agent session/participants/run stream không liên quan tới việc định nghĩa nhánh điều kiện."},

{id:23, type:"match", text:"Match each Magentic orchestration concept to its description.",
 rows:[
  {desc:"Coordinates specialized agents and decides which participant should act next.", correct:"Magentic Manager"},
  {desc:"Records goals, sub-goals, and execution planning as the work progresses.", correct:"Dynamic Task Ledger"},
  {desc:"Creates the workflow for this adaptive orchestration pattern.", correct:"Magentic Builder"},
  {desc:"Starts the orchestration for a complex task with streaming execution.", correct:"run_stream"},
  {desc:"Event type that carries the final orchestration result.", correct:"workflow output event"}
 ],
 pool:["Magentic Manager","Dynamic Task Ledger","Magentic Builder","run_stream","workflow output event","Sequential Builder","Agent Session"],
 explain:"Magentic Manager điều phối agent và quyết định ai hành động tiếp theo; Dynamic Task Ledger ghi lại goal/sub-goal/kế hoạch; Magentic Builder tạo workflow cho pattern adaptive này; run_stream khởi động orchestration ở dạng streaming; workflow output event mang kết quả cuối cùng. Sequential Builder thuộc pattern cố định thứ tự, không phải adaptive; Agent Session chỉ lưu context hội thoại."},

{id:24, type:"fill", text:"Fill in the blanks about A2A executor request handling.",
 blanks:[
  {prefix:"When handling a request, the executor uses", options:["request context","agent card","version","event queue"], correct:"request context", suffix:"to inspect request details,"},
  {prefix:"and uses", options:["event queue","request context","agent card","version"], correct:"event queue", suffix:"to send results, task updates, or artifacts back to the client."}
 ],
 explain:"Request context cho executor biết thông tin chi tiết về request đến. Event queue dùng để gửi kết quả/cập nhật/artifact trở lại client. Agent card chỉ là metadata mô tả agent để discovery, version chỉ định phiên bản — cả hai không dùng để xử lý runtime của 1 request."},

{id:25, type:"single", text:"A company wants one agent to access tools from several different remote MCP servers depending on the workflow being handled. How should this be configured?",
 options:["The agent must merge all remote servers into a single endpoint before any tools can be used","Multiple MCP servers can be added as separate MCP tools, so the agent can use different tool sources as needed","The agent can contact multiple servers only if none of them require headers or authentication","Only one MCP server can be attached to an agent, so separate agents are required for each server"],
 correct:1,
 explain:"1 agent có thể có nhiều MCP tool, mỗi tool trỏ tới 1 server khác nhau — không cần gộp thành 1 endpoint, không bị giới hạn phải không có auth/headers, và không cần tạo agent riêng cho mỗi server."},

{id:26, type:"multi", text:"A developer is configuring an MCP tool object for a remote server. Which two properties are core identifiers for the server connection?", note:"Chọn 2 đáp án",
 options:["Server URL","Server label","Approval request ID","Thread instructions"],
 correct:[0,1],
 explain:"Server URL xác định endpoint của MCP server; server label là định danh duy nhất của server đó trong cấu hình tool. Approval request ID thuộc về approval workflow sau khi có yêu cầu gọi tool; thread instructions ảnh hưởng hành vi agent, không phải định danh kết nối server."},

{id:27, type:"tf", text:"For each statement about MCP tool approval modes, indicate True or False.",
 statements:[
  {text:"If no approval mode is provided for an MCP tool, approval is required for every tool call by default.", answer:true},
  {text:"The supported approval mode values are 'always' and 'never'.", answer:true},
  {text:"Different remote MCP servers can be used within the same overall agent setup.", answer:true},
  {text:"Setting approval to 'never' means the workflow pauses before each tool invocation to request approval.", answer:false}
 ],
 explain:"1,2,3 True. 4 False: 'never' nghĩa là bỏ qua yêu cầu approval hoàn toàn, không phải là tạm dừng để xin approval."},

{id:28, type:"tf", text:"For each statement about workflow documentation and versioning, indicate True or False.",
 statements:[
  {text:"YAML cannot be used for source control or version tracking tasks.", answer:false},
  {text:"The visual canvas is useful for conceptual understanding and tracing execution paths.", answer:true},
  {text:"Versioning can help teams compare changes and identify who made updates.", answer:true},
  {text:"Documenting workflows with notes can reduce errors and speed up later updates.", answer:true}
 ],
 explain:"1 False: YAML là dạng text, hoàn toàn phù hợp để lưu source control và theo dõi version. 2,3,4 True: canvas trực quan giúp hiểu/trace workflow; versioning giúp so sánh thay đổi và biết ai sửa; ghi note giúp giảm lỗi và tăng tốc update sau này."},

{id:29, type:"order", text:"Arrange the steps involved in setting up an A2A agent server in the correct order.",
 correctOrder:["Define the agent skills and agent card","Initialize a request handler linked to a task store","Set up the server application with the agent card and request handler","Start the server with an ASGI server","Accept incoming requests and respond through the hosted service"],
 explain:"Định nghĩa skill/agent card → khởi tạo request handler gắn với task store → thiết lập server app với agent card + request handler → khởi động server bằng ASGI server → chấp nhận request và trả lời qua service đã host."},

{id:30, type:"single", text:"A support organization is deploying an AI agent that can read internal files, call external tools, and respond to customers. A hidden instruction inside a user-submitted message causes the agent to ignore its intended rules and reveal restricted information. What security risk does this illustrate?",
 options:["Data poisoning","Prompt injection and manipulation attacks","Model inversion and output leakage","Inadequate auditability and logging"],
 correct:1,
 explain:"Đây là prompt injection: input được chèn hướng dẫn ẩn khiến agent bỏ qua rule và tiết lộ thông tin bị giới hạn. Data poisoning liên quan tới việc làm hỏng dữ liệu training/context lâu dài, không phải 1 lần tấn công tức thời. Model inversion liên quan tới suy luận thông tin nhạy cảm từ output model. Logging/auditability chỉ giúp phát hiện sau, không phải bản chất của cuộc tấn công."},

{id:31, type:"multi", text:"A team wants an AI agent platform that can invoke tools automatically, keep conversation state managed by the service, offer built-in tools such as code execution and file search, support secure enterprise use, and provide monitoring for debugging and optimization. Which five capabilities align with those requirements?", note:"Chọn 5 đáp án",
 options:["Mandatory manual tool orchestration for every request","No support for model choice","Automatic tool calling","Securely managed conversation state through the responses API","Extensive tool catalog","Enterprise-grade security","Observability and tracing","No option for customizable storage solutions"],
 correct:[2,3,4,5,6],
 explain:"5 khả năng phù hợp: automatic tool calling (không cần orchestrate tay), conversation state được quản lý an toàn qua responses API, tool catalog phong phú, enterprise-grade security, và observability/tracing để debug/tối ưu. Các lựa chọn còn lại mô tả sai ngược lại nền tảng thực tế (platform giảm việc orchestrate tay, có support chọn model, và có tuỳ chọn storage tuỳ biến)."},

{id:32, type:"multi", text:"A product team wants software that can act for a user, interpret context, decide what to do next, and use connected capabilities to complete work. Which three characteristics align with that design?", note:"Chọn 3 đáp án",
 options:["It can perform tasks on behalf of users or other programs","It combines AI models with specialized tools to complete work","It must follow only fixed predefined rules and cannot adapt","It can analyze information and make decisions autonomously instead of only generating text","It requires a person to direct every individual step before it can continue"],
 correct:[0,1,3],
 explain:"Agent có thể hành động thay cho người dùng, kết hợp model với tool chuyên biệt, và tự phân tích/quyết định hành động tiếp theo (không chỉ sinh text). Nó không bị giới hạn chỉ theo rule cố định, và không cần người điều khiển từng bước một."},

{id:33, type:"single", text:"A team is designing an orchestration for an AI solution that must always perform three actions in the same order: check submitted input, add supporting information, then produce an answer. They want a structure that is straightforward to follow and easy to analyze. Which workflow pattern is the best fit?",
 options:["Human in the loop workflow","Group chat workflow","Sequential workflow","Event replay workflow"],
 correct:2,
 explain:"Sequential workflow phù hợp với chuỗi bước cố định, mỗi bước truyền kết quả cho bước sau — đúng với yêu cầu 'luôn theo cùng 1 thứ tự'. Human-in-the-loop cần người can thiệp; group chat cho phép kiểm soát chuyển đổi linh hoạt giữa agent; event replay chỉ để phát lại hành động cũ, không phải định nghĩa workflow tuần tự."},

{id:34, type:"single", text:"A solution architect wants enterprise-oriented agent capabilities that include secure Azure integration, automatic tool invocation, persistent thread handling, and support for advanced features such as MCP connectivity. What should the architect choose?",
 options:["A generic base agent instance with no service-backed enterprise features","Microsoft Foundry Agent Service through Microsoft Foundry Agents","A function tool collection without any agent service","A chat provider abstraction by itself"],
 correct:1,
 explain:"Microsoft Foundry Agent Service cung cấp đầy đủ: tích hợp Azure an toàn, tự động gọi tool, quản lý thread bền vững, và hỗ trợ MCP — đúng nhu cầu enterprise. Base agent thông thường, chỉ có function tool, hoặc chỉ có chat provider abstraction đều thiếu các tính năng managed enterprise này."},

{id:35, type:"single", text:"A development team wants an A2A agent to participate in live workflows with external clients and peer agents. They have already defined the agent skills and agent card. What should they do next to make the agent reachable over HTTP and able to process incoming work?",
 options:["Add more tags to each skill","Rename the agent card file","Remove the agent executor and use the agent card directly","Host the agent on a server"],
 correct:3,
 explain:"Phải host agent trên server để agent có thể truy cập qua HTTP và xử lý request thực tế. Thêm tag hay đổi tên file card không tạo ra service khả dụng trên mạng; bỏ executor sẽ khiến agent không thể thực thi task vì agent card chỉ là metadata mô tả, không tự chạy được."},

{id:36, type:"multi", text:"An architect is comparing workflow designs for a multi-agent solution in Microsoft Foundry. Which three statements are accurate?", note:"Chọn 3 đáp án",
 options:["The way a workflow is structured can be just as important as the agents used within it","A human-in-the-loop workflow continues immediately after posing a question, even if no response has been received","Microsoft Foundry includes predefined workflow patterns that help model interactions in a clear and consistent manner","In a group chat workflow, agents can build on prior agent outputs and adjust as new inputs arrive","A sequential workflow is primarily intended for situations where control shifts unpredictably between specialized agents"],
 correct:[0,2,3],
 explain:"Cấu trúc workflow quan trọng không kém agent bên trong nó; Foundry có sẵn các pattern workflow định nghĩa trước để mô hình hoá tương tác rõ ràng; group chat cho phép agent tận dụng output trước và thích ứng khi có input mới. Human-in-the-loop phải chờ phản hồi mới tiếp tục (không tiếp tục ngay khi chưa có response); sequential workflow theo thứ tự cố định, không phải dành cho việc chuyển quyền kiểm soát khó đoán."},

{id:37, type:"single", text:"A workflow needs an agent to return data in a predictable shape so later nodes can route requests and assign variables reliably. Which approach should be used?",
 options:["Define a structured response format such as a JSON schema","Store the output only as unstructured free text","Disable variable usage for the agent response","Use an end node to reshape the response automatically"],
 correct:0,
 explain:"JSON schema (structured response format) đảm bảo output có cấu trúc dự đoán được để node sau route/gán biến ổn định. Free text không đảm bảo cấu trúc cố định; tắt variable đi ngược lại nhu cầu; end node chỉ đánh dấu kết thúc, không định nghĩa schema output."},

{id:38, type:"single", text:"A workflow designer is considering concurrent orchestration for a process that must deliver the same repeatable output every time, follow a strict series of steps, and stay within a tight model usage quota. What is the best recommendation?",
 options:["Use concurrent orchestration because independent agents improve determinism","Avoid concurrent orchestration because the task has sequence, repeatability, and resource constraints","Use concurrent orchestration only if all agents share intermediate outputs continuously","Avoid concurrent orchestration only when no tools are involved"],
 correct:1,
 explain:"Vì cần thứ tự nghiêm ngặt, kết quả lặp lại y hệt, và giới hạn quota chặt, nên tránh concurrent orchestration — chạy song song sẽ thêm biến động, phối hợp phức tạp, và tăng lượng gọi model. Chạy song song không tự động cải thiện độ xác định (determinism); chia sẻ output liên tục không phải điều kiện quyết định; việc có/không có tool không phải yếu tố chính ở đây."},

{id:39, type:"match", text:"Match each Azure speech capability to its description.",
 rows:[
  {desc:"Convert spoken audio into written text for an application.", correct:"Speech to text"},
  {desc:"Produces spoken audio output from written input.", correct:"Text to speech"},
  {desc:"Converts spoken input into other languages.", correct:"Speech translation"},
  {desc:"Supports AI agents that hold real-time spoken conversations.", correct:"Voice Live"}
 ],
 pool:["Speech to text","Text to speech","Speech translation","Voice Live","Optical character recognition","Image captioning"],
 explain:"Speech to text nhận diện giọng nói thành văn bản; Text to speech tạo giọng nói từ văn bản; Speech translation dịch giọng nói sang ngôn ngữ khác; Voice Live hỗ trợ hội thoại giọng nói thời gian thực cho agent. OCR trích xuất text từ ảnh, image captioning mô tả nội dung ảnh — không liên quan tới giọng nói."},

{id:40, type:"multi", text:"A solution architect is documenting how a team can extend voice features across a Microsoft Foundry implementation, covering where capabilities apply and how developers in different languages can work with them. Which two statements should be included?", note:"Chọn 2 đáp án",
 options:["Azure Speech and Foundry Tools is limited to standalone scripts and cannot be used in project-based solutions","Only Python follows the documented integration approach — other languages require a completely different model","Azure Speech and Foundry Tools can add speech support to applications and agents built in Microsoft Foundry projects","SDKs for languages such as C# and JavaScript follow a similar pattern to the Python SDK"],
 correct:[2,3],
 explain:"Azure Speech/Foundry Tools có thể thêm khả năng giọng nói cho ứng dụng/agent xây trên Foundry project; các SDK ngôn ngữ khác (C#, JavaScript) theo cùng pattern tích hợp tương tự Python SDK. Nó không bị giới hạn ở script độc lập, và Python không phải là ngôn ngữ duy nhất theo pattern chuẩn."},

{id:41, type:"fill", text:"Fill in the blanks about text-to-speech completion.",
 blanks:[
  {prefix:"When text to speech completes successfully, the reason property is set to", options:["synthesizing audio completed","canceled","result ID","recognized speech"], correct:"synthesizing audio completed", suffix:","},
  {prefix:"and the generated audio stream is available in", options:["audio data","result ID","text","properties"], correct:"audio data", suffix:"."}
 ],
 explain:"Khi tổng hợp giọng nói thành công, reason = 'SynthesizingAudioCompleted' và audio data chứa luồng âm thanh đã tạo. Result ID chỉ định danh kết quả, không chứa audio; canceled chỉ báo synthesis không hoàn tất bình thường."},

{id:42, type:"tf", text:"For each statement about speech tools in a playground environment, indicate True or False.",
 statements:[
  {text:"The first time an AI agent attempts to use a speech tool in a playground environment, the user may be prompted to approve the tool call before it runs.", answer:true},
  {text:"A playground can include a setting that automatically approves future use of Azure Speech MCP server tools to reduce repeated approval prompts.", answer:true},
  {text:"In a playground, a text-to-speech operation can produce a generated audio file rather than returning only text output.", answer:true},
  {text:"An audio transcription request can use either a publicly accessible file URL or a SAS URL for a file stored in Azure Blob Storage.", answer:true}
 ],
 explain:"Cả 4 phát biểu đều True: cần approval lần đầu dùng tool; có setting tự động approve cho lần sau; text-to-speech trả về audio file thật; transcription nhận input từ URL công khai hoặc SAS URL trên Blob Storage."},

{id:43, type:"single", text:"A production engineering team is deploying a Python application that connects to Azure AI Voice Live and wants to use the recommended authentication approach for a secure production environment. Which option should be selected?",
 options:["Azure key credential","Default Azure credential","Anonymous access","A storage connection string"],
 correct:1,
 explain:"Default Azure credential được khuyến nghị cho production vì hỗ trợ xác thực theo Microsoft Entra (managed identity, service principal...) mà không cần hardcode secret. Azure key credential kém an toàn hơn vì phải quản lý key tĩnh; anonymous access không xác thực; connection string dùng cho storage, không dùng để kết nối Voice Live."},

{id:44, type:"fill", text:"Fill in the blanks about implementing a translation feature.",
 blanks:[
  {prefix:"The method expects the source text to be provided as a list of", options:["input text item objects","Azure key credential objects","translation scope objects","language detection objects"], correct:"input text item objects", suffix:"objects."},
  {prefix:"When the source language is unknown, the developer can omit", options:["from_language","to_language","translation_scope","azure_key_credential"], correct:"from_language", suffix:"and allow the service to detect it automatically."},
  {prefix:"The destination languages are provided as a list in", options:["to_language","from_language","translation_scope","input_text_item"], correct:"to_language", suffix:"."}
 ],
 explain:"Văn bản nguồn được gửi dưới dạng list các input text item object. from_language có thể bỏ qua để service tự phát hiện ngôn ngữ nguồn. to_language chứa danh sách ngôn ngữ đích cần dịch tới."},

{id:45, type:"multi", text:"A developer is testing named entity recognition output from a text analysis solution. Which three values are valid entity categories or subcategories that the service can return?", note:"Chọn 3 đáp án",
 options:["Person","DateTime","Subnet","Organization","Virtual Machine"],
 correct:[0,1,3],
 explain:"Person, DateTime, Organization là các category thực tế mà NER có thể trả về. Subnet và Virtual Machine là thuật ngữ hạ tầng mạng/cloud computing, không phải category NER chuẩn."},

{id:46, type:"multi", text:"A legal team wants to review sensitive content before deciding whether to mask it. What does Azure Language return when recognizing PII entities in text?", note:"Chọn 2 đáp án",
 options:["A required manual approval token for each entity","A translated version of the document","Confidence scores for detected entities","Identified entities with categories"],
 correct:[2,3],
 explain:"Azure Language trả về entity đã nhận diện kèm category, và confidence score cho từng entity để đánh giá độ tin cậy. Nó không trả về approval token thủ công hay bản dịch — đó là các tác vụ khác."},

{id:47, type:"multi", text:"A developer is building a utility that must transcribe speech stored in a WAV file instead of capturing live input from the computer microphone, following the normal speech recognition pattern used by the SDK. Which three actions are required?", note:"Chọn 3 đáp án",
 options:["Replace speech config with a speech recognition result before starting recognition","Create an audio config that points to the audio file","Create a speech recognizer by using speech config and audio config","Call a recognition method on the speech recognizer"],
 correct:[1,2,3],
 explain:"Cần tạo audio config trỏ tới file audio, tạo speech recognizer kết hợp speech config + audio config, rồi gọi method nhận diện trên recognizer đó. Speech config vẫn cần thiết cho cấu hình dịch vụ — không được thay thế bằng speech recognition result (đó là kết quả trả về sau khi nhận diện, không phải input cấu hình)."},

{id:48, type:"multi", text:"A testing specialist wants to adjust speech behavior through natural language instructions in the request itself, without modifying the existing tool connection. Which three customizations can be set this way?", note:"Chọn 3 đáp án",
 options:["Choose a neural voice for generated speech","Specify the language for recognition or synthesis","Change the agent model family directly from the prompt","Set the storage replication mode for the blob container","Provide phrase hints to improve recognition accuracy"],
 correct:[0,1,4],
 explain:"Có thể chọn neural voice, chỉ định ngôn ngữ, và cung cấp phrase hint ngay trong request mà không cần đổi kết nối tool. Đổi model family hay storage replication không phải là customization về hành vi giọng nói ở cấp request."},

{id:49, type:"single", text:"A developer writes 'async for evt in conn' in a running voice client. What does this loop do?",
 options:["It iterates through server events arriving on the connection","It replays stored microphone files from disk","It retries authentication until a valid token is found","It converts synchronous callbacks into threads"],
 correct:0,
 explain:"Vòng lặp này lắng nghe bất đồng bộ các event từ server gửi tới qua kết nối đang mở, không phải để phát lại file mic, không xử lý xác thực, và không chuyển callback thành thread."},

{id:50, type:"multi", text:"A designer is using an image-capable model in the Foundry portal and wants to fine-tune how generated images are produced. Which two options might be available when the selected model supports them?", note:"Chọn 2 đáp án",
 options:["Choose a subnet for image placement","Set the image resolution","Attach a database schema to guide composition","Provide a reference image"],
 correct:[1,3],
 explain:"Có thể chỉnh resolution ảnh đầu ra, và một số model hỗ trợ dùng ảnh tham chiếu để định hướng style/cấu trúc kết quả. Subnet là khái niệm networking, database schema là cấu trúc dữ liệu — cả hai không liên quan tới việc tinh chỉnh ảnh sinh ra."},

{id:51, type:"order", text:"Arrange the stages in the correct order for transforming unstructured input into usable extracted results.",
 correctOrder:["Receive source content","Run content extraction","Generate field values from the schema","Return structured output"],
 explain:"Nhận nội dung nguồn → chạy trích xuất nội dung (OCR/transcription/layout) → tạo giá trị field theo schema → trả về output có cấu trúc (JSON/markdown)."},

{id:52, type:"fill", text:"Fill in the blanks about image analysis output for different purposes.",
 blanks:[
  {prefix:"For search and retrieval workflows that depend on a text-style representation of image content, the result can include", options:["markdown","fields","analyzer ID","enum"], correct:"markdown", suffix:"."},
  {prefix:"For structured extraction scenarios that map values to a defined schema, the result can include", options:["fields","markdown","source","file bytes"], correct:"fields", suffix:"."}
 ],
 explain:"Markdown là dạng text hoá nội dung ảnh, phù hợp cho search/retrieval. Fields chứa giá trị đã trích xuất khớp với schema, phù hợp cho structured extraction. Analyzer ID, enum, source, file bytes không phải là phần output chính cho 2 mục đích này."},

{id:53, type:"match", text:"Match each Azure Content Understanding analysis concept to its description.",
 rows:[
  {desc:"Starts an analysis request by sending the file reference to a specific analyzer.", correct:"POST analyze request"},
  {desc:"Represents the identifier returned after an analysis request is accepted.", correct:"Operation ID"},
  {desc:"Indicates the SDK object used to wait for asynchronous completion.", correct:"Poller object"},
  {desc:"Is used when sending raw file bytes instead of a URL reference.", correct:"Analyze binary operation"},
  {desc:"Contains the analyzed output objects returned by the SDK result.", correct:"Contents property"}
 ],
 pool:["POST analyze request","Operation ID","Poller object","Analyze binary operation","Contents property","API key header","Paragraph span"],
 explain:"POST analyze request khởi động phân tích bằng cách gửi file reference tới analyzer. Operation ID trả về sau khi request được nhận (do xử lý bất đồng bộ). Poller object dùng để đợi hoàn tất. Analyze binary operation dùng khi gửi raw bytes thay vì URL. Contents property chứa các object output đã phân tích. API key header dùng xác thực, paragraph span là metadata cấu trúc tài liệu — cả hai không thuộc nhóm concept quản lý luồng phân tích này."},

{id:54, type:"single", text:"A company handles multiple form types and each form type already has its own custom extraction model. The team wants to submit incoming documents to one endpoint and have the service determine which component model should be used. Which feature best meets this need?",
 options:["Read model","Composed model","Searchable PDF","Template labels file"],
 correct:1,
 explain:"Composed model gộp nhiều custom model vào 1 endpoint, tự phân loại và định tuyến document tới model con phù hợp. Read model chỉ trích xuất text chung, không chọn giữa nhiều model. Searchable PDF liên quan tới output tài liệu có thể tìm kiếm, template labels file dùng để chuẩn bị training — cả hai không phải cơ chế routing runtime."},

{id:55, type:"tf", text:"For each statement about search indexes and knowledge stores, indicate True or False.",
 statements:[
  {text:"A cloud search index can contain information derived from original data, not only the raw source fields.", answer:true},
  {text:"A knowledge store can be used to keep extracted insights for later analysis or downstream integration.", answer:true},
  {text:"A search solution can index information only from strictly structured relational tables.", answer:false},
  {text:"Enterprise search is one possible use case for a managed cloud search platform.", answer:true}
 ],
 explain:"1,2,4 True: index có thể chứa dữ liệu enriched (entity, key phrase...) chứ không chỉ raw field; knowledge store lưu insight cho phân tích/tích hợp sau; enterprise search là use case phổ biến. 3 False: search platform xử lý được cả structured, semi-structured, và unstructured content, không chỉ bảng quan hệ."},

{id:56, type:"single", text:"A developer needs a programmatic way to create, manage, and use analyzers in Azure Content Understanding from a custom client application. Which interface should the developer use?",
 options:["The Content Understanding API","Azure Resource Manager templates only","Azure DNS REST endpoints","Microsoft Sentinel data connectors"],
 correct:0,
 explain:"Content Understanding API là interface đúng để tạo/quản lý/dùng analyzer từ client application. ARM template chỉ deploy resource, DNS REST endpoint dùng cho name resolution, Sentinel data connector dùng cho security data ingestion — không liên quan tới việc gọi analyzer."},

{id:57, type:"single", text:"A REST client submits a request to create an analyzer and receives a callback URL from the service. The operation does not complete immediately. What should the client do next?",
 options:["Replace the API key with a SAS token before checking status","Resubmit the same PUT request every few seconds until a success response is returned","Use repeated GET requests against the callback URL until the reported status is no longer 'running'","Create a second analyzer with the same name to force the first operation to finish"],
 correct:2,
 explain:"Vì đây là thao tác bất đồng bộ, client cần poll bằng GET request lặp lại tới callback URL cho tới khi status không còn 'running'. Không cần đổi sang SAS token, không nên gửi lại PUT liên tục, và tạo analyzer trùng tên không ép được operation đầu hoàn tất."},

{id:58, type:"multi", text:"A document processing solution must support extracting general text/layout from mixed documents, using ready-made models for common business forms, and training models for company-specific forms. Which three model categories satisfy those needs?", note:"Chọn 3 đáp án",
 options:["Document analysis models","Pre-built models","Language understanding models","Custom models"],
 correct:[0,1,3],
 explain:"Document analysis model xử lý trích xuất chung (text, layout, table); pre-built model đã train sẵn cho form phổ biến (invoice, receipt...); custom model dùng để train riêng cho form đặc thù của công ty. Language understanding model không thuộc nhóm model xử lý tài liệu này."},

{id:59, type:"single", text:"A team is processing multi-page PDF and TIFF files and wants to analyze only a selected range of pages instead of the entire file. Which model and feature combination supports that requirement directly?",
 options:["Layout model with a training label set","Receipt model with the language parameter","Read model with the pages parameter","ID document model with a classifier setting"],
 correct:2,
 explain:"Read model kết hợp với tham số pages cho phép chỉ định trang/khoảng trang cụ thể cần phân tích trong file nhiều trang. Training label set liên quan tới việc train custom model; language parameter chỉ ảnh hưởng ngôn ngữ; classifier setting không liên quan tới việc chọn trang."},

{id:60, type:"single", text:"Based on the overall theme of Foundry-based document and content processing, which statement best summarizes why choosing the correct model/feature combination matters for multi-page file analysis?",
 options:["It has no effect on cost or performance since all pages are always processed", "Selecting page-range or model-specific parameters can reduce unnecessary processing and let teams target only the relevant content", "Model and feature choice only matters for single-page images, never for multi-page files", "Every model automatically detects and skips irrelevant pages without any configuration"],
 correct:1,
 explain:"Chọn đúng tham số (như 'pages' trên Read model) giúp tránh xử lý toàn bộ tài liệu không cần thiết, tiết kiệm chi phí/thời gian và chỉ tập trung vào phần nội dung liên quan. Các lựa chọn khác đều phóng đại hoặc sai về hành vi thực tế (không có tự động bỏ qua trang không cấu hình, và việc chọn tham số vẫn quan trọng với multi-page file)."}
];
