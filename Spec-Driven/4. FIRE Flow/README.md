# Context

Trong phần này chúng ta sẽ đi sâu vào tìm hiểu FIRE Flow và ứng dụng đối với một bài toán đơn giản để hiểu cách sử dụng hơn.

## Giới thiệu về FIRE Flow

Khác với Simple Flow mà chúng ta đã tìm hiểu ở phần trước, FIRE Flow là một quy trình Phát triển dựa trên đặc tả thích ứng (Adaptive Spec-Driven Development) được sử dụng tối ưu dành cho các dự án monorepo hay nhưng dự án sẵn có (tức là các dự án đã phát triển trước đó).

Mục tiêu của quy trình này giúp chúng ta loại bỏ các bước không cần thiết mà có thể focus vào bước mà chúng ta cần quan tâm ví dụ request yêu cầu chúng ta sửa một tính năng trên UI cho phần search, lúc này chúng ta không cần phải generate ngược lại các requirements trước đó mà tập trung vào thực hiện tính năng UI kia được ngay nhưng vẫn đảm bảo không phá vỡ cấu trúc.

Note: FIRE tận dụng hướng tự động điều chỉnh (dynamic) tối đa để thích nghi với dự án thay hướng theo plan


Sơ đồ flow của FIRE

![image](setup_1.png)


**FIRE** Khi bạn kích hoạt Builder agent (tác vụ xây dựng), nó sẽ quét toàn bộ các mục đích (intents) và đầu việc (work items) còn lại, phân tích sự phụ thuộc giữa chúng, và đề xuất những đầu việc nào có thể triển khai song song cùng nhau tiếp theo. Bạn chỉ cần phê duyệt hoặc điều chỉnh, sau đó hệ thống sẽ thực thi ngay. Không có kế hoạch thực hiện nào được lập sẵn từ trước.

### Một câu hỏi đặt ra, vậy khi nào nên sử dụng FIRE Flow
#### Khi bạn ghét những thứ phức tạp cản trở không cần thiết (You hate unnecessary friction)
- FIRE được thiết kế cho các nhóm nhỏ gắn kết hoặc các nhà phát triển độc lập (solo devs) – những người muốn bàn giao sản phẩm nhanh chóng mà không bị cản trở bởi các thủ tục hành chính, rườm rà.
#### Bạn đang làm việc với một dự án sẵn có (You're working in a brownfield codebase)
- FIRE sẽ phân tích cấu trúc hiện tại của dự án. Nó tôn trọng các pattern (khuôn mẫu thiết kế) sẵn có của bạn để mở rộng tính năng thay vì viết lại từ đầu.
#### Bạn làm việc trên một Monorepo duy nhất
- Các tiêu chuẩn phân cấp hỗ trợ tốt cho nhiều tech stack (nền tảng công nghệ) khác nhau trên từng module, trong khi vẫn chia sẻ chung các chính sách cốt lõi.
#### Bạn muốn một sự chặt chẽ linh hoạt (You want adaptive rigor)
- Các tác vụ đơn giản sẽ được xử lý và hoàn thành cực nhanh. Ngược lại, các thay đổi phức tạp sẽ nhận được sự tập trung kỹ lưỡng xứng đáng. FIRE tinh chỉnh các thủ tục ở mức vừa đủ.
#### Dự án của bạn không phải lúc nào cũng cần tuân theo Domain-Design Driven
- Nếu dự án của bạn không cần mô hình hóa tên miền phức tạp (Domain-Driven Design), FIRE sẽ không ép buộc bạn phải làm điều đó. Tài liệu thiết kế (Design docs) sẽ chỉ xuất hiện khi mức độ phức tạp thực sự đòi hỏi.

# Các khái niệm thành phần cốt lỗi của FỈRE

Cấu trúc folder của FIRE Flow

```bash
project/
├── .specsmd/
│   └── fire/                    # FIRE flow definition
│       └── agents/              # Agent definitions
│
└── .specs-fire/                 # Project artifacts
    ├── state.yaml               # Central state tracking
    ├── standards/               # Project standards
    │   ├── constitution.md      # Universal policies (always inherited)
    │   ├── tech-stack.md        # Technology choices
    │   ├── coding-standards.md  # Code conventions
    │   └── folder-structure.md  # Directory layout
    ├── intents/                 # Intent documentation
    │   └── {intent-id}/
    │       ├── brief.md
    │       └── work-items/
    ├── runs/                    # Run logs
    └── walkthroughs/            # Generated documentation
```

### Mục đích (Intent)

Item này mô tả mục tiêu giúp mang lại giá trị (value) cho người dùng. Nó được ghi nhận thông qua cuộc hội thoại có định hướng cụ thể hơn là cần các tài liệu đặc tả (requirements) dài dòng.

```yaml
intent:
  id: auth-system
  title: User Authentication System
  status: in_progress
  priority: high
```

### Đầu công việc (Work Item)

Khi đã xác định mục đích, break thành các đơn vị công việc riêng biệt, mỗi đầu công việc sẽ hoàn thành trong một step ở lượt phase chạy (Run) duy nhất.

```yaml
work_item:
  id: create-user-schema
  title: Create user database schema
  complexity: low
  mode: autopilot  # 0 checkpoints
```

### Lượt chạy (Run)

Thể hiện chu kỳ thực thi duy nhất cho một đầu việc (Work). Hệ thống sẽ tải ngữ cảnh (context), thực thi theo chế độ đã định, theo dõi các thay đổi và tạo tài liệu hướng dẫn (walkthrough).

### Tài liệu hướng dẫn (Walkthrough)

Được tạo ra sau mỗi lượt chạy (Run)). Tài liệu này ghi lại những gì đã thay đổi, lý do tại sao thay đổi và cách thức để xác thực (verify) thay đổi đó.

# References