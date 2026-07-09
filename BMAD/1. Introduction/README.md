# Context

Trong phần này chúng ta sẽ tìm hiểu về bmad và cách sử dụng bmad vào project

# Introductionn

BMad Method (Build More Architect Dreams) là một framework phát triển phần mềm dựa trên AI trong hệ sinh thái BMad Method, giúp bạn xây dựng phần mềm xuyên suốt toàn bộ quy trình, từ hình thành ý tưởng (idea) và lập kế hoạch (plan) cho tới triển khai với agent. Framework này cung cấp các AI agent chuyên biệt, workflow có hướng dẫn, và khả năng lập kế hoạch thông minh thích ứng với độ phức tạp của dự án, dù bạn đang sửa một lỗi nhỏ hay xây dựng một nền tảng doanh nghiệp.

# BMAD

BMad giúp bạn xây dựng phần mềm thông qua các workflow có hướng dẫn với những AI agent chuyên biệt.
Tương tự các Framework khác, Bt chia quy trình gồm bốn phase:

| Phase | Tên | Điều xảy ra |
| :---: | :--- | :--- |
| **1** | Analysis | Brainstorming, nghiên cứu, product brief hoặc PRFAQ (tùy chọn) |
| **2** | Planning | Tạo tài liệu yêu cầu (PRD hoặc spec) |
| **3** | Solutioning | Thiết kế kiến trúc (chỉ dành cho BMad Method/Enterprise) |
| **4** | Implementation | Xây dựng theo từng epic, từng story |

# BMAD Architecture

Tương Tự Spec BMAD cũng chia làm 3 mô hình luồng thực hiện tùy theo độ phức tạp của dự án và tính nằng.

| Nhánh | Phù hợp nhất với | Tài liệu được tạo |
| :--- | :--- | :--- |
| **Quick Flow** | Sửa lỗi, tính năng đơn giản, phạm vi rõ ràng (1-15 story) | Chỉ spec |
| **BMad Method** | Sản phẩm, nền tảng, tính năng phức tạp (10-50+ story) | PRD + Architecture + UX |
| **Enterprise** | Yêu cầu tuân thủ, hệ thống đa tenant (30+ story) | PRD + Architecture + Security + DevOps |

### note: BMAD cung cấp một command powerfully thông qua lệnh ```bmad-help``` no sẽ giúp bạn nhận biết bạn đã làm đến đâu và đề xuất chính xác bước tiếp theo

# References