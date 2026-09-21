export interface Question {
  id: number
  stage: number
  stageTitle: string
  question: string
  options: { key: string; text: string }[]
  correctAnswer: string
  explanation: string
  keyKnowledge: string[]
}

const stages = [
  'KHỞI NGUỒN NHẬN THỨC',
  'NHẬN THỨC CẢM TÍNH',
  'NHẬN THỨC LÝ TÍNH',
  'CHÂN LÝ',
  'THỰC TIỄN & VẬN DỤNG',
]

const rawQuestions: Array<[string, string[], string, string, string[]]> = [
  ['Theo quan điểm duy vật biện chứng, nguồn gốc tự nhiên của nhận thức là gì?', ['Ý thức tồn tại độc lập với thế giới', 'Thế giới khách quan và bộ óc người', 'Niềm tin cá nhân', 'Ngôn ngữ thuần túy'], 'B', 'Nhận thức bắt nguồn từ thế giới khách quan tác động vào bộ óc người. Đây là quá trình phản ánh tích cực, năng động và sáng tạo, không phải sao chép thụ động.', ['Thế giới khách quan', 'Bộ óc người', 'Phản ánh tích cực']],
  ['Yếu tố xã hội nào giữ vai trò đặc biệt quan trọng đối với sự hình thành và phát triển nhận thức?', ['Lao động và ngôn ngữ', 'Bản năng', 'Giấc mơ', 'Phản xạ sinh học'], 'A', 'Lao động và ngôn ngữ là những yếu tố xã hội đặc biệt quan trọng, tạo ra nhu cầu giao tiếp, truyền đạt và phát triển tri thức.', ['Lao động', 'Ngôn ngữ', 'Nguồn gốc xã hội']],
  ['“Nhận thức là quá trình phản ánh hiện thực khách quan vào bộ óc người” cần hiểu chữ “phản ánh” như thế nào?', ['Sao chép máy móc', 'Thụ động hoàn toàn', 'Tích cực, năng động và sáng tạo', 'Chỉ phản ánh những gì nhìn thấy'], 'C', 'Phản ánh là quá trình chủ thể chủ động tiếp nhận, xử lý và sáng tạo tri thức trên cơ sở hiện thực khách quan.', ['Phản ánh năng động', 'Tính sáng tạo', 'Chủ thể nhận thức']],
  ['Một nhà nghiên cứu đặt giả thuyết, tiến hành thí nghiệm rồi điều chỉnh giả thuyết dựa trên kết quả. Ví dụ này thể hiện rõ nhất đặc điểm nào?', ['Nhận thức hoàn toàn chủ quan', 'Nhận thức là quá trình vận động và phát triển', 'Tri thức không cần thực tiễn', 'Cảm tính thay thế lý tính'], 'B', 'Giả thuyết được kiểm tra, bổ sung và điều chỉnh qua thí nghiệm. Nhận thức vì thế luôn vận động và phát triển cùng thực tiễn.', ['Giả thuyết', 'Thực nghiệm', 'Vận động và phát triển']],
  ['Nhận thức của con người có thể đạt tới bản chất của sự vật không?', ['Không bao giờ', 'Có, thông qua quá trình nhận thức và thực tiễn, nhưng không phải một lần là xong', 'Chỉ bằng cảm giác', 'Chỉ bằng trực giác'], 'B', 'Con người có khả năng nhận thức bản chất, nhưng đó là quá trình lâu dài, từng bước và luôn được thực tiễn bổ sung, kiểm nghiệm.', ['Khả năng nhận thức', 'Thực tiễn', 'Quá trình lịch sử']],
  ['“Cảm giác” là hình thức nhận thức cảm tính phản ánh điều gì?', ['Thuộc tính riêng lẻ của sự vật khi tác động trực tiếp vào giác quan', 'Mối liên hệ bản chất', 'Quy luật phổ biến', 'Khái niệm'], 'A', 'Cảm giác là hình thức đầu tiên của nhận thức cảm tính, phản ánh từng thuộc tính riêng lẻ khi sự vật tác động trực tiếp vào giác quan.', ['Cảm giác', 'Thuộc tính riêng lẻ', 'Giác quan']],
  ['Khi nhìn một chiếc xe và nhận ra hình dáng, màu sắc, vị trí của nó như một chỉnh thể, đó là...', ['Cảm giác', 'Tri giác', 'Suy luận', 'Khái niệm'], 'B', 'Tri giác tạo ra hình ảnh tương đối hoàn chỉnh về sự vật khi nhiều cảm giác được tổng hợp thành một chỉnh thể.', ['Tri giác', 'Hình ảnh chỉnh thể', 'Nhận thức cảm tính']],
  ['Bạn từng nhìn thấy một chiếc xe máy. Sau đó nhắm mắt nhưng vẫn hình dung được chiếc xe. Đây là...', ['Biểu tượng', 'Phán đoán', 'Suy luận', 'Quy luật'], 'A', 'Biểu tượng là hình ảnh của sự vật được lưu giữ và tái hiện trong trí nhớ khi sự vật không còn tác động trực tiếp vào giác quan.', ['Biểu tượng', 'Trí nhớ', 'Hình ảnh trực quan']],
  ['Điểm chung của cảm giác, tri giác và biểu tượng là gì?', ['Đều thuộc nhận thức lý tính', 'Đều thuộc nhận thức cảm tính', 'Đều là chân lý tuyệt đối', 'Đều là suy luận'], 'B', 'Cảm giác, tri giác và biểu tượng đều là ba hình thức cơ bản của nhận thức cảm tính, gắn với hình ảnh trực quan.', ['Nhận thức cảm tính', 'Cảm giác', 'Tri giác và biểu tượng']],
  ['Tình huống: Bạn thấy một người bạn im lặng và cúi đầu. Bạn chỉ dựa vào biểu hiện đó để kết luận “bạn ấy chắc chắn đang buồn”. Sai lầm chính là gì?', ['Đã đồng nhất biểu hiện cảm tính với bản chất', 'Đã sử dụng lý tính quá nhiều', 'Đã kiểm nghiệm bằng thực tiễn', 'Đã dùng khái niệm chính xác'], 'A', 'Một biểu hiện có thể có nhiều nguyên nhân. Đồng nhất dấu hiệu cảm tính với bản chất là bỏ qua phân tích lý tính và điều kiện cụ thể.', ['Hiện tượng và bản chất', 'Giới hạn cảm tính', 'Phân tích điều kiện']],
  ['Hình thức cơ bản đầu tiên của nhận thức lý tính là...', ['Cảm giác', 'Tri giác', 'Khái niệm', 'Biểu tượng'], 'C', 'Khái niệm là hình thức cơ bản đầu tiên của nhận thức lý tính, phản ánh những thuộc tính bản chất và chung của sự vật.', ['Khái niệm', 'Nhận thức lý tính', 'Thuộc tính bản chất']],
  ['Phán đoán là gì?', ['Sự phản ánh một thuộc tính riêng lẻ bằng giác quan', 'Hình thức liên kết các khái niệm để khẳng định hoặc phủ định một thuộc tính, quan hệ nào đó', 'Một hình ảnh trực quan', 'Một hành động thực tiễn'], 'B', 'Phán đoán liên kết các khái niệm để khẳng định hoặc phủ định một thuộc tính hay quan hệ của sự vật.', ['Phán đoán', 'Liên kết khái niệm', 'Khẳng định hoặc phủ định']],
  ['Suy luận là quá trình...', ['Từ một hay nhiều phán đoán đã biết rút ra phán đoán mới', 'Từ cảm giác tạo ra giác quan', 'Sao chép sự vật', 'Chỉ quan sát hiện tượng'], 'A', 'Suy luận dùng một hay nhiều phán đoán đã biết làm tiền đề để rút ra phán đoán mới theo quy tắc logic.', ['Suy luận', 'Phán đoán', 'Logic']],
  ['Mối quan hệ giữa nhận thức cảm tính và lý tính được hiểu đúng nhất là...', ['Tách rời hoàn toàn', 'Cảm tính thay thế lý tính', 'Lý tính không cần cảm tính', 'Thống nhất biện chứng, tác động qua lại và bổ sung cho nhau'], 'D', 'Cảm tính cung cấp tài liệu trực tiếp, lý tính khái quát bản chất; hai giai đoạn thống nhất, tác động và bổ sung cho nhau.', ['Cảm tính và lý tính', 'Thống nhất biện chứng', 'Khái quát bản chất']],
  ['Tình huống: Một sinh viên thuộc lòng định nghĩa “lạm phát” nhưng không giải thích được vì sao giá cả tăng trong một trường hợp cụ thể. Vấn đề nằm ở đâu?', ['Có lý tính nhưng chưa gắn tri thức với thực tiễn', 'Có quá nhiều thực tiễn', 'Không cần nhận thức cảm tính', 'Đã đạt chân lý tuyệt đối'], 'A', 'Tri thức lý luận chỉ phát huy giá trị khi được vận dụng để giải thích và định hướng những tình huống thực tế cụ thể.', ['Lý luận và thực tiễn', 'Vận dụng tri thức', 'Lạm phát']],
  ['Theo quan điểm duy vật biện chứng, chân lý là...', ['Điều đa số tin', 'Tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm', 'Ý kiến của người có quyền lực', 'Điều luôn luôn bất biến'], 'B', 'Chân lý là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm. Số đông hay quyền lực không tự tạo ra chân lý.', ['Chân lý', 'Hiện thực khách quan', 'Kiểm nghiệm thực tiễn']],
  ['Tính khách quan của chân lý có nghĩa là...', ['Chân lý phụ thuộc hoàn toàn vào mong muốn cá nhân', 'Nội dung chân lý không phụ thuộc vào ý muốn chủ quan của con người', 'Mọi người đều có chân lý riêng', 'Chân lý không liên quan hiện thực'], 'B', 'Tính khách quan khẳng định nội dung đúng đắn của chân lý do hiện thực quy định, không do mong muốn chủ quan quyết định.', ['Tính khách quan', 'Nội dung chân lý', 'Hiện thực']],
  ['Tính cụ thể của chân lý yêu cầu chúng ta...', ['Áp dụng một kết luận giống nhau trong mọi hoàn cảnh', 'Xem xét chân lý trong điều kiện, hoàn cảnh và quan hệ xác định', 'Không cần xét điều kiện', 'Chỉ tin vào kinh nghiệm cá nhân'], 'B', 'Mọi chân lý đều gắn với điều kiện, hoàn cảnh và quan hệ xác định. Vận dụng đúng phải xem xét đầy đủ bối cảnh.', ['Tính cụ thể', 'Điều kiện lịch sử', 'Hoàn cảnh']],
  ['Chân lý tương đối và chân lý tuyệt đối có quan hệ như thế nào?', ['Loại trừ nhau', 'Chân lý tương đối không chứa yếu tố đúng', 'Chân lý tương đối chứa những yếu tố của chân lý tuyệt đối và quá trình nhận thức tiến gần hơn đến sự đầy đủ', 'Chỉ có một trong hai tồn tại'], 'C', 'Chân lý tương đối chứa những yếu tố đúng đắn của chân lý tuyệt đối. Nhận thức phát triển sẽ ngày càng bổ sung và hoàn thiện tri thức.', ['Chân lý tương đối', 'Chân lý tuyệt đối', 'Tính phát triển']],
  ['Một định luật khoa học được xác nhận trong một phạm vi điều kiện nhất định. Việc phát hiện điều kiện mới làm tri thức được bổ sung. Điều này phản ánh...', ['Tính phát triển của nhận thức và mối quan hệ giữa tương đối – tuyệt đối', 'Chân lý không tồn tại', 'Mọi tri thức đều sai', 'Thực tiễn không quan trọng'], 'A', 'Tri thức đúng trong phạm vi xác định có thể được bổ sung khi điều kiện và thực tiễn mới xuất hiện. Đó là sự thống nhất giữa tương đối và tuyệt đối.', ['Khoa học', 'Tương đối và tuyệt đối', 'Bổ sung tri thức']],
  ['Theo Lý luận nhận thức Mác – Lênin, thực tiễn là gì?', ['Toàn bộ suy nghĩ của con người', 'Hoạt động vật chất có mục đích, mang tính lịch sử – xã hội của con người nhằm cải biến tự nhiên và xã hội', 'Mọi hoạt động tinh thần', 'Chỉ là lao động chân tay'], 'B', 'Thực tiễn là hoạt động vật chất có mục đích, mang tính lịch sử - xã hội, nhằm cải biến tự nhiên và xã hội; không chỉ giới hạn ở lao động chân tay.', ['Thực tiễn', 'Hoạt động vật chất', 'Lịch sử - xã hội']],
  ['Thực tiễn là cơ sở của nhận thức vì...', ['Con người chỉ cần thực hành, không cần tư duy', 'Thực tiễn cung cấp đối tượng, nhu cầu, tài liệu và kinh nghiệm cho nhận thức', 'Thực tiễn luôn đúng tuyệt đối', 'Nhận thức không tác động lại thực tiễn'], 'B', 'Thực tiễn cung cấp đối tượng, nhu cầu, tài liệu và kinh nghiệm, từ đó tạo nền tảng cho quá trình nhận thức.', ['Cơ sở của nhận thức', 'Nhu cầu', 'Kinh nghiệm']],
  ['Thực tiễn là động lực của nhận thức vì...', ['Nó tạo ra những nhu cầu, nhiệm vụ và thúc đẩy tri thức phát triển', 'Nó loại bỏ lý luận', 'Nó làm mọi tri thức trở thành tuyệt đối ngay lập tức', 'Nó không cần khoa học'], 'A', 'Những vấn đề nảy sinh trong thực tiễn đặt ra nhu cầu và nhiệm vụ mới, thúc đẩy khoa học, tư duy và tri thức phát triển.', ['Động lực nhận thức', 'Nhu cầu mới', 'Phát triển tri thức']],
  ['Thực tiễn là mục đích của nhận thức vì...', ['Tri thức cuối cùng cần quay trở lại phục vụ, hướng dẫn và cải biến thực tiễn', 'Tri thức chỉ để ghi nhớ', 'Nhận thức không cần ứng dụng', 'Thực tiễn chỉ dùng để kiểm tra'], 'A', 'Tri thức không dừng ở ghi nhớ; nó phải quay trở lại phục vụ, hướng dẫn và cải biến hoạt động thực tiễn.', ['Mục đích nhận thức', 'Vận dụng', 'Cải biến thực tiễn']],
  ['Một nhóm sinh viên đưa ra một phương pháp học mới. Họ dựa vào lý thuyết, áp dụng trong thực tế, đo kết quả, phát hiện hạn chế rồi sửa phương pháp. Chuỗi nào thể hiện đúng tinh thần lý luận nhận thức?', ['Lý luận → thực tiễn → kiểm nghiệm → điều chỉnh nhận thức', 'Cảm giác → tin tưởng → kết luận', 'Ý kiến → chân lý tuyệt đối', 'Lý luận → lý luận → lý luận'], 'A', 'Chuỗi này thể hiện vòng tròn nhận thức: lý luận định hướng thực tiễn, thực tiễn kiểm nghiệm và những hạn chế mới thúc đẩy điều chỉnh nhận thức ở trình độ cao hơn.', ['Vòng tròn nhận thức', 'Kiểm nghiệm', 'Điều chỉnh nhận thức']],
]

export const questions: Question[] = rawQuestions.map(([question, options, correctAnswer, explanation, keyKnowledge], index) => ({
  id: index + 1,
  stage: Math.floor(index / 5) + 1,
  stageTitle: stages[Math.floor(index / 5)],
  question,
  options: options.map((text, optionIndex) => ({ key: String.fromCharCode(65 + optionIndex), text })),
  correctAnswer,
  explanation,
  keyKnowledge,
}))

export { stages }
