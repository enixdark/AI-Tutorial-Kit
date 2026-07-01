# Context

Trong phần này chúng ta sẽ tập trung đi vào phân tích và tìm hiểu về AI-DLC, đây là tầng cao nhất của Flow đặc biệt khi áp dụng Agentic AI vào SDLC

# Đinh nghĩa (Introduction)

AI-DLC hay AI Development Life Cycle tức vòng đời phát triển phần mềm định hướng bởi AI là một hệ phương pháp toàn diện dành cho việc phát triển phần mềm AI-native, phương pháp này ban đầu được định nghĩa bởi AWS với Amazon Q và sau là Kiro. Phương pháp này cung cấp khả năng truy vết toàn diện (traceability), tích hợp thiết kế hướng tên miền (DDD), và các giai đoạn có cấu trúc chặt chẽ dành cho các dự án phức tạp.
Đây là một phương pháp sẽ tái định nghĩa lại khi mà giờ con người sẽ giao tiép thông qua việc AI dẫn dắt hội thoại còn con người chỉ đưa ra các quyết định phê duyệt. Khác với mô hình Agile truyền thống khi các phân đoạn lặp (iterations) kéo dài hàng tuần (2-4 tuần), AI-DLC vận hành theo các Bolt, bản chất là các chu kỳ lặp siêu tốc được tính bằng giờ hoặc bằng ngày.




Mục tiêu mà AI-DLC hướng tới:
- Trong trường hợp chúng ta cần khả năng tuy vết toàn diện (traceability), bất kỳ 1 thay đổi nào đều được lưu trữ để chúng ta có thể kiểm tra lại khi cần.
- Làm việc với DĐD, hiểu được Bussiness, về cơ bản việc áp dụng DDD khá phức tạp đòi hỏi người tham gia phải hiểu và áp dụng, đặc biệt trong các dự án phức tạp
- Khi dự án có nhiều team cần phối hợp với nhai 

Nguyên tắc tiếp cận AI-DLC
**Định hướng bởi AI (AI-Driven)**
- AI sẽ dẫn dắt cuộc hội thoại, đề xuất giải pháp và tạo ra các thành phẩm (artifacts). Con người thực hiện xác thực và định hướng.
**Chu kỳ lặp siêu tốc (Rapid Iterations)**
- Các "Bolt" sẽ thay thế cho các "Sprint". Hoàn thành các khối lượng công việc có ý nghĩa chỉ trong vài giờ, không phải vài tuần.
**Điểm kiểm tra của con người (Human Checkpoints)**
- Sự phê duyệt từ con người tại mỗi điểm kiểm tra giúp phát hiện và ngăn chặn các lỗi sai trước khi chúng tạo ra hiệu ứng dây chuyền.
**Thiết kế trước tiên (Design-First)**
- Phương pháp thiết kế hướng tên miền (Domain-Driven Design) được tích hợp sẵn vào ngay trong các "construction bolts", chứ không phải là một yếu tố bổ sung sau khi đã hoàn thành.


Tương tự như các Flow khác, AI-DLC cũng chia ra làm 3 Phase 

![image](setup_1.png)

| Giai đoạn <br>*(Phase)* | Tác nhân <br>*(Agent)* | Phương thức <br>*(Ritual)* | Đầu ra <br>*(Output)* |
| :--- | :--- | :--- | :--- |
| **Inception** <br>*(Khởi tạo)* | Inception Agent | Mob Elaboration <br>*(Thảo luận tập thể)* | Intents *(Mục đích)*, Units *(Đơn vị)*, Stories *(Câu chuyện người dùng)*, Bolt Plans *(Kế hoạch chớp nhoáng)* |
| **Construction** <br>*(Xây dựng)* | Construction Agent | Mob Construction <br>*(Lập trình tập thể)* | Domain Models *(Mô hình miền)*, Code *(Mã nguồn)*, Tests *(Kiểm thử)* |
| **Operations** <br>*(Vận hành)* | Operations Agent | Continuous <br>*(Liên tục)* | Deployments *(Triển khai)*, Monitoring *(Giám sát)* |

Trong đó 

### Mục Đích (Intent)

Mô tả rõ ràng mục tiêu mà hướng tới

```yaml
intent:
  id: 001-user-authentication
  title: User Authentication System
  status: in_progress
```

### Đơn vị (Unit)

define rõ các module mà có thể phát triển độc lập tách dời (loosely-coupled)

### Story 

tưởng tự ta sử dụng User Story để mô tả hành vị mong muốn và các tiêu chí châp thuận 

### Bolt

luồng thực thi theo khung thời gian (timebox), được định nghĩ để thực hiện đối với một story

Mở rộng hơn ta có 

![image](setup_2.png)

Tương tự FIRE, AI-DLC cũng define ra 4 Agent để triển khai 

| Tác nhân *(Agent)* | Giai đoạn *(Phase)* | Trách nhiệm *(Responsibility)* |
| :--- | :--- | :--- |
| **Master** | All *(Tất cả)* | Điều phối toàn bộ quy trình, định tuyến các yêu cầu, duy trì nhận thức hệ thống |
| **Inception** | Inception *(Khởi tạo)* | Ghi nhận các mục đích (intents), xây dựng chi tiết các yêu cầu, lập kế hoạch chớp nhoáng (bolt plans) |
| **Construction** | Construction *(Xây dựng)* | Thực thi các kế hoạch thông qua các giai đoạn của phương pháp DDD |
| **Operations** | Operations *(Vận hành)* | Đóng gói (build), triển khai (deploy), xác thực (verify), giám sát hệ thống (monitor) |

# Cấu trúc của AI-DLC

```yaml
memory-bank/                   # AI-DLC artifacts
├── intents/                   # Captured intents
│   └── {intent-id}/
│       ├── requirements.md
│       ├── system-context.md
│       └── units/
│           └── {unit-id}/
│               ├── unit-brief.md
│               └── stories/
├── bolts/                     # Bolt execution records
├── standards/                 # Project standards
│   ├── tech-stack.md
│   ├── coding-standards.md
│   ├── system-architecture.md
│   └── ...
└── operations/                # Deployment context
```

