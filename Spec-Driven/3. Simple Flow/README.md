# Context

Trong phần này chúng ta sẽ đi sâu vào tìm hiểu Simple Flow và ứng dụng đối với một bài toán đơn giản để hiểu cách sử dụng hơn.

## Giới thiệu về Simple Flow

**Simple Flow** là một quy trình phát triển dựa trên đặc tả (spec-driven) gọn nhẹ (Lightweight), dành cho các dự án không cần đến sự phức tạp toàn diện của AI-DLC. Quy trình này tương tự Kiro Spec sẽ trải qua từng bước ba giai đoạn để chuyển đổi một ý tưởng tính năng thành một kế hoạch triển khai khả thi.

3 Phase của Simple Flow

![image](setup_1.png)

| Giai đoạn | Đầu ra (Output) | Mục đích |
| :--- | :--- | :--- |
| **Requirements** *(Yêu cầu)* | `requirements.md` | Xác định những gì cần xây dựng bằng user stories và tiêu chí EARS |
| **Design** *(Thiết kế)* | `design.md` | Tạo thiết kế kỹ thuật với kiến trúc và biểu đồ Mermaid |
| **Tasks** *(Nhiệm vụ)* | `tasks.md` | Tạo danh sách kiểm tra (checklist) triển khai với các tác vụ lập trình cụ thể |

Cấu trúc folder của Simple Flow

```bash
specs/
└── {feature-name}/
    ├── requirements.md    # What to build
    ├── design.md          # How to build it
    └── tasks.md           # Step-by-step plan
```

## Nguyên tắc sử dụng

#### Khi phát triển tiếp cận theo hướng tạo trước, Hỏi sau (Generate First, Ask Later)
- AI sẽ tạo ngay một bản thảo tài liệu (requirements)) dựa trên ý tưởng, tính năng mà bạn muốn. Bản thảo này đóng vai trò là điểm khởi đầu cho cuộc thảo luận, thay vì yêu cầu bạn phải trả lời quá nhiều câu hỏi (Q&A) ngay từ đầu.

#### Phê duyệt rõ ràng theo từng chặng (Explicit Approval Gates)
- Sau bước requirements, Bạn cần phải phê duyệt rõ ràng (approve) từng giai đoạn trước khi tiếp tục. Hãy nói “yes”, “approved” hoặc “looks good” để đi tiếp. Mọi phản hồi (feedback) từ bạn đều sẽ kích hoạt quá trình chỉnh sửa lại bản thảo.
#### Tập trung giải quyết từng giai đoạn (One Phase at a Time)
- AI chỉ tập trung vào một tài liệu duy nhất trong mỗi lượt tương tác. Hãy hoàn thành dứt điểm từng giai đoạn trước khi chuyển sang giai đoạn tiếp theo.
#### Xử lý từng tác vụ (One Task at a Time)
- Trong quá trình triển khai, chỉ có một tác vụ duy nhất được thực hiện trong mỗi lượt tương tác. Điều này giúp bạn có thể kiểm tra kỹ lưỡng từng thay đổi một.

# 3 Phase của Simple Flow

![image](setup_1b.png)

Như thấy ở phần đầu Simple Flow dựa theo SDLC đưa ra 3 phase cơ bản đối với phát triển phần mềm.

#### Phase 1: Requirements

Trong phase này, mọi người sẽ dựa trên ý tưởng hay một business case để bắt đầu đưa ra những idea thông qua thu thập từ biz user để break ra các user story và các tiêu chỉ chấp thuận (acceptance criteria). Thông thường phase này sẽ đừng từ góc độ view Biz (Bussiness Architecture) với sự tham gia của Business Owner, Product Owner * UX/UI và Business analytic để brain storming đưa ra.

thông thường đàu ra là một file requirements với cấu trúc

```bash
specs/{feature}/requirements.md
```

Trong file này tùy thuộc tính năng, nhưng thông thường mô tả

- Giới thiệu (Introduction): Tóm tắt tính năng từ 2 đến 3 câu.
- Thuật ngữ (Glossary): Các thuật ngữ chuyên ngành được sử dụng nhất quán xuyên suốt tài liệu.
- Yêu cầu (Requirements): Các user stories đi kèm với tiêu chỉ chấp thuận (acceptance criteria) theo cấu trúc đinh dạng EARS.

Note: định dạng EARS (EARS Format) hay Easy Approach to Requirements Syntax là cách tiếp cận đơn giản trong đó:

### Định dạng EARS (EARS Format)

| Dạng yêu cầu (Pattern) | Định dạng (Format) | Ví dụ (Example) |
| :--- | :--- | :--- |
| **Kích hoạt bằng sự kiện**<br>*(Event-driven)* | **KHI** [kích hoạt], **THÌ [hệ thống] SẼ** [phản hồi]<br>*(WHEN [trigger], THE [system] SHALL [response])* | **KHI** người dùng gửi thông tin đăng nhập, **THÌ** Hệ_thống_Xác_thực **SẼ** kiểm tra thông tin tài khoản. |
| **Dựa trên trạng thái**<br>*(State-driven)* | **TRONG KHI** [điều kiện], **THÌ [hệ thống] SẼ** [phản hồi]<br>*(WHILE [condition], THE [system] SHALL [response])* | **TRONG KHI** phiên làm việc còn hoạt động, **THÌ** Hệ_thống_Xác_thực **SẼ** làm mới mã token. |
| **Tình huống ngoài ý muốn**<br>*(Unwanted / Error)* | **NẾU** [điều kiện lỗi], **THÌ [hệ thống] SẼ** [phản hồi]<br>*(IF [condition], THEN THE [system] SHALL [response])* | **NẾU** mật khẩu không hợp lệ, **THÌ** Hệ_thống_Xác_thực **SẼ** hiển thị thông báo lỗi. |
| **Tùy chọn / Không bắt buộc**<br>*(Optional)* | **TRONG TRƯỜNG HỢP** [tùy chọn], **THÌ [hệ thống] SẼ** [phản hồi]<br>*(WHERE [option], THE [system] SHALL [response])* | **TRONG TRƯỜNG HỢP** tính năng MFA được bật, **THÌ** Hệ_thống_Xác_thực **SẼ** yêu cầu thêm yếu tố xác thực thứ hai. |

Example

```
## Requirements

### Requirement

**User Story:** As a user, I want to log in with my email and password,
so that I can access my account.

#### Acceptance Criteria

1. WHEN user submits valid credentials, THE Auth_System SHALL create a session
2. IF password is invalid, THEN THE Auth_System SHALL display error message
3. WHILE session is active, THE Auth_System SHALL maintain authentication state
```

#### Phase 2: Design

Đây là phase sẽ mang hướng thuần góc nhìn Technical/Software Architecture.