# Context

Trong phần này chúng ta sẽ đi vào thực hiện tạo một project với cấu trúc AI-DL flow với dạng bài tính tổng các số nguyên số tố.

# Cài đặt và sử dụng

## Yêu cầu cài đặt (Prerequisites)
- Node.js > 18
- Python >= 3.9
- Claude Code cli hoặc IDE như Cursor, VSCode

## Thực hiện

Bước 1: khởi tạo context cho AI-DLC Flow

Sau đó chúng ta chạy lệnh
```bash
npx specsmd@latest install
```

![image](setup_8.png)

Nội dung sẽ được tạo ra theo đúng cấu trúc mà ta đã tìm hiểu

![image](setup_9.png)

Bước 2: Khởi tạo project

mở IDE hay claude console lên và hạy lệnh

```bash
/specsmd-master-agent
```

sau đó gõ

```bash
project-init
```

agent sẽ đọc context file và hỏi loại app mà muốn tạo.
trong phần này ta tạo cli-tool để demo thôi + ngôn ngữ Python. Tại đây hãy thực hiện approve hay cấp thông tin để tạo standard rules trước khi bắt đầu story.

![image](setup_10.png)

![image](setup_11.png)


Bước 3: Sau khi đã tạo standard rules xong, chuyển tiếp tới phase inception

thực hiện gõ

```bash
/specsmd-inception-agent intent-create
```

Tương tự agent sẽ hỏi, dẫn dắt bạn mô tả thông tin cần thiết để hoàn thành các bước trong inception phase và tạo ra unit trong memory bank.

![image](setup_12.png)

Bước 4: Đánh giá rà soát lại thông tin trong file markdown và kiểm tra bolt

```bash
/specsmd-inception-agent bolt-plan
```

