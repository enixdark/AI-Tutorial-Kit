# Context

Trong phần này chúng ta sẽ đi sâu về

Như trong phần Introduction ta thấy Flow của Fire chia ra Intent - Work Item - Run - Walkthrough

![image](setup_5.png)

Để giải thích kỹ hơn ta đi vào từng phase

### Mục đích, ý định (Intent)


Một Ý định (Intent) là một mục tiêu hướng tới việc mang lại giá trị cho người dùng. Đó chính là câu trả lời cho câu hỏi "làm cái gì" (what) và "tại sao" (why) đối với tính năng của bạn.

Ví dụ cấu trúc

```yaml
intent:
  id: auth-system
  title: User Authentication System
  description: |
    Enable users to create accounts, log in securely,
    and manage their sessions.
  status: in_progress
  priority: high
  created: 2024-01-15T10:00:00Z
```

Kết quả là một bản tài liệu mô tả được sinh ra
```bash
.specs-fire/intents/{id}/brief.md
```

```
# User Authentication System

## Objective
Enable users to create accounts, log in securely, and manage sessions.

## Context
- New greenfield project
- Expected 10k users at launch
- Must support social login in future (not MVP)

## Success Criteria
- Users can register with email/password
- Users can log in and receive session token
- Sessions expire after 24 hours
- Password reset via email works
```

Ở phần status thể hiện trạng thái, có tất cả 4 trạng thái cung cấp thông tin cụ thể của ý định đó.

| Trạng thái (State) | Mô tả (Description) |
| :--- | :--- |
| **Đang chờ (pending)** | Đã được ghi nhận nhưng chưa bắt đầu |
| **Đang thực hiện (in_progress)** | Các hạng mục công việc đang được thực thi |
| **Bị chặn (blocked)** | Đang chờ phụ thuộc vào yếu tố bên ngoài (external dependency) |
| **Hoàn thành (done)** | Tất cả các hạng mục công việc đã hoàn thành |

### Hạng mục công việc (Work Item)

Một hạng mục công việc (Work Item) là một đơn vị công việc riêng biệt để thực hiện một nhiệm vụ cụ thể. Mỗi hạng mục công việc:
* Có định nghĩa thế nào là hoàn thành (definition of done) một cách rõ ràng
* Hoàn thành trong một lượt Chạy (Run) duy nhất
* Được chỉ định độ phức tạp và chế độ thực thi (execution mode) riêng
* Có thể phụ thuộc vào các hạng mục công việc khác

Cấu trúc

```yaml
work_item:
  id: user-schema
  intent_id: auth-system
  title: Create user database schema
  description: Set up the users table with authentication fields
  complexity: low
  mode: autopilot
  depends_on: []
  status: pending
```

