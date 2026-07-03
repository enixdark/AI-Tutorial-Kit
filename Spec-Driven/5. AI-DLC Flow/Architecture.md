# Context

Trong phần này chúng ta sẽ đi tìm hiểu về các Phase của kiến trúc AI-DLC

![image](setup_2.png)


AI-DLC phân rõ quy trình phát triển thành 3 giai đoạn (3 Phase)), mỗi giai đoạn sẽ đưa ra đàu ra output rõ ràng 

### Giai tạo Khởi tạo (Phase Inception)

Giai đoạn này ghi nhận các ý định, chi tiết hóa các yêu cầu và phân rã công việc thành các đơn vị có thể quản lý được. Giai đoạn này giúp chuyển đổi các mục tiêu cấp cao thành các hạng mục công việc được định nghĩa rõ ràng và có thể triển khai được.

#### Các hoạt động chính
- Ghi nhận Ý định (Intent Capture): Thu thập mục tiêu cấp cao, ví dụ: “Hệ thống xác thực người dùng”.
- Chi tiết hóa Yêu cầu (Requirement Elaboration): AI đưa ra các câu hỏi làm rõ, tự động tạo ra các user stories và các yêu cầu phi chức năng (NFRs).
- Xác định Bối cảnh Hệ thống (System Context): Định nghĩa các ranh giới, giao diện và các ràng buộc.
- Phân rã Đơn vị (Unit Decomposition): Chia nhỏ ý định thành các đơn vị có tính liên kết lỏng lẻo (loosely-coupled) và có thể phát triển độc lập.
- Lập kế hoạch Bolt (Bolt Planning): Lên kế hoạch cho các chu kỳ chớp nhoáng (bolts) cần thiết để triển khai từng câu chuyện người dùng.

#### Kết quả đầu ra 

| Tạo tác *(Artifact)* | Mô tả *(Description)* |
| :--- | :--- |
| **requirements.md** | Các câu chuyện người dùng, tiêu chí nghiệm thu, và các yêu cầu phi chức năng (NFRs). |
| **system-context.md** | Các ranh giới, giao diện và các ràng buộc của hệ thống. |
| **units.md** | Định nghĩa các Đơn vị (Units) đi kèm với các mối quan hệ phụ thuộc. |
| **Bolt Plans** | Danh sách các chu kỳ Bolt được sắp xếp theo thứ tự cho từng đơn vị. |


### Giai đoạn Xây Dựng (Phase Construction)

Đây là giai đoạn 2 của Flow, Trong giai đoạn này sẽ tiến hành thực thi các chu kỳ Bolt qua các giai đoạn đã được xác thực, thực hiện (implementation) tạo ra mã nguồn đã được kiểm thử và sẵn sàng vận hành thực tế (production-ready). Gia đoạn này giúp chuyển đổi các bản đặc tả thành mã nguồn chạy được và đã qua kiểm thử thông qua các giai đoạn có kỷ luật.

