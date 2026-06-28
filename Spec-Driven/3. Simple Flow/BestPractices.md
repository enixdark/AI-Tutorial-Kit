# Context 
Phần này sẽ note một số lưu ý, best practices khi áp dụng AI với Simple Flow


### Cung cấp ý tưởng/tính năng một cách rõ ràng cụ thể (Be specific with feature ideas)
* **Good:** “Xác thực người dùng bằng email/mật khẩu và quản lý phiên đăng nhập (session).”
* **Bad:** “Tính năng đăng nhập.”
* *Ý tưởng càng cụ thể, các tài liệu đặc tả (specs) được tạo ra sẽ càng chất lượng.*

### Đánh giá, kiểm tra kỹ từng giai đoạn (Review each phase carefully)
Đừng vội vàng phê duyệt. Giai đoạn thiết kế (design) sẽ ảnh hưởng trực tiếp đến việc tạo tác vụ (tasks), và các tác vụ này sẽ quyết định chất lượng triển khai code.

### Thực hiện từng tác vụ một, cơ chế mặc định (One task at a time - default)
AI sẽ tạm dừng sau mỗi tác vụ để bạn kiểm tra. Nếu bạn đã hoàn toàn tự tin, hãy ra lệnh “continue until done” (tiếp tục cho đến khi xong) hoặc “go yolo” (chạy hết luôn đi).

### Tận dụng các điểm kiểm tra (Use checkpoints)
Các tác vụ checkpoint sẽ chạy toàn bộ bộ kiểm thử (test suite). Đừng bỏ qua chúng — chúng giúp bạn phát hiện và xử lý lỗi từ rất sớm.