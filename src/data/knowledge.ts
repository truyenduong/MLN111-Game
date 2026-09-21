export interface KnowledgeChapter {
  id: number
  title: string
  icon: string
  concept: string
  points: string[]
  forms: string[]
  example: string
  remember: string
  pitfalls: string
}

export const knowledgeChapters: KnowledgeChapter[] = [
  { id: 1, title: 'KHỞI NGUỒN NHẬN THỨC', icon: '01', concept: 'Nhận thức là quá trình phản ánh tích cực, năng động và sáng tạo hiện thực khách quan vào bộ óc người trên cơ sở thực tiễn.', points: ['Nguồn gốc tự nhiên: thế giới khách quan và bộ óc người.', 'Nguồn gốc xã hội: lao động và ngôn ngữ.', 'Nhận thức vận động, phát triển và có khả năng đạt tới bản chất sự vật.'], forms: ['Thế giới khách quan', 'Bộ óc người', 'Lao động + ngôn ngữ'], example: 'Nhà nghiên cứu đặt giả thuyết, thí nghiệm và điều chỉnh kết luận theo kết quả thực tế.', remember: 'Phản ánh không phải sao chép máy móc; đó là hoạt động sáng tạo của chủ thể.', pitfalls: 'Không tách nhận thức khỏi hiện thực khách quan, cũng không xem nhận thức là thụ động.' },
  { id: 2, title: 'NHẬN THỨC CẢM TÍNH', icon: '02', concept: 'Nhận thức cảm tính là giai đoạn đầu, phản ánh trực tiếp đối tượng thông qua các giác quan.', points: ['Cảm giác phản ánh thuộc tính riêng lẻ.', 'Tri giác tạo hình ảnh tương đối hoàn chỉnh.', 'Biểu tượng là hình ảnh được lưu giữ và tái hiện trong trí nhớ.'], forms: ['CẢM GIÁC', 'TRI GIÁC', 'BIỂU TƯỢNG'], example: 'Nhìn một chiếc xe: thấy màu đỏ là cảm giác; nhận ra đó là một chiếc xe là tri giác; nhắm mắt vẫn hình dung được là biểu tượng.', remember: 'Cảm giác → thuộc tính riêng lẻ; tri giác → chỉnh thể; biểu tượng → hình ảnh trong trí nhớ.', pitfalls: 'Không đồng nhất một biểu hiện cảm tính với bản chất của sự vật.' },
  { id: 3, title: 'NHẬN THỨC LÝ TÍNH', icon: '03', concept: 'Nhận thức lý tính là giai đoạn cao hơn, phản ánh gián tiếp và khái quát những thuộc tính bản chất, quy luật của sự vật.', points: ['Khái niệm là hình thức cơ bản đầu tiên.', 'Phán đoán liên kết khái niệm để khẳng định hoặc phủ định.', 'Suy luận rút ra phán đoán mới từ phán đoán đã biết.'], forms: ['KHÁI NIỆM', 'PHÁN ĐOÁN', 'SUY LUẬN'], example: 'Từ dữ liệu về giá cả, thu nhập và sản lượng, người học khái quát và giải thích được một trường hợp lạm phát cụ thể.', remember: 'Cảm tính cung cấp tài liệu, lý tính khái quát bản chất; hai giai đoạn thống nhất biện chứng.', pitfalls: 'Thuộc lòng khái niệm mà không biết vận dụng vào thực tiễn vẫn là tri thức chưa hoàn chỉnh.' },
  { id: 4, title: 'CHÂN LÝ', icon: '04', concept: 'Chân lý là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm.', points: ['Chân lý có tính khách quan.', 'Chân lý có tính cụ thể, gắn với điều kiện xác định.', 'Chân lý tương đối chứa những yếu tố của chân lý tuyệt đối.'], forms: ['KHÁCH QUAN', 'CỤ THỂ', 'PHÁT TRIỂN'], example: 'Một định luật đúng trong phạm vi điều kiện nhất định có thể được bổ sung khi khoa học phát hiện điều kiện mới.', remember: 'Không lấy số đông, quyền lực hay mong muốn cá nhân làm tiêu chuẩn của chân lý.', pitfalls: 'Không áp dụng một kết luận tách khỏi hoàn cảnh và điều kiện cụ thể.' },
  { id: 5, title: 'THỰC TIỄN & VẬN DỤNG', icon: '05', concept: 'Thực tiễn là hoạt động vật chất có mục đích, mang tính lịch sử - xã hội nhằm cải biến tự nhiên và xã hội.', points: ['Thực tiễn là cơ sở của nhận thức.', 'Thực tiễn là động lực thúc đẩy tri thức phát triển.', 'Thực tiễn là mục đích và tiêu chuẩn kiểm nghiệm chân lý.'], forms: ['CƠ SỞ', 'ĐỘNG LỰC', 'MỤC ĐÍCH / TIÊU CHUẨN'], example: 'Một phương pháp học được áp dụng, đo lường, phát hiện hạn chế rồi điều chỉnh ở vòng tiếp theo.', remember: 'Lý luận phải quay trở lại hướng dẫn, phục vụ và cải biến thực tiễn.', pitfalls: 'Không tuyệt đối hóa thực hành để phủ nhận tư duy, cũng không tách lý luận khỏi ứng dụng.' },
]
