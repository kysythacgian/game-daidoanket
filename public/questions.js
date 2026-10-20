// =====================================================================
// NGÂN HÀNG CÂU HỎI – NGÀY HỘI ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC
// Mỗi câu: q = câu hỏi, a = 4 đáp án, c = vị trí đáp án đúng (bắt đầu từ 0)
// =====================================================================

window.CONFIG = { perTurn: 10 }; // số câu hỏi mỗi lượt

window.QUESTIONS = {

  // ======================== MIỀN BẮC ========================
  bac: [
    // ----- Địa lý – danh thắng -----
    {q:"Thủ đô của Việt Nam là thành phố nào?", a:["Hà Nội","Huế","Đà Nẵng","Hải Phòng"], c:0},
    {q:"Vịnh Hạ Long thuộc tỉnh nào?", a:["Quảng Ninh","Hải Dương","Thanh Hóa","Nghệ An"], c:0},
    {q:"Đỉnh Fansipan – nóc nhà Đông Dương – thuộc tỉnh nào?", a:["Lai Châu","Lào Cai","Hà Giang","Sơn La"], c:1},
    {q:"Cao nguyên đá Đồng Văn thuộc tỉnh nào?", a:["Hà Giang","Lào Cai","Yên Bái","Sơn La"], c:0},
    {q:"Thác Bản Giốc – thác nước đẹp nổi tiếng – thuộc tỉnh nào?", a:["Lạng Sơn","Cao Bằng","Hà Giang","Lào Cai"], c:1},
    {q:"Hồ Ba Bể – hồ nước ngọt tự nhiên lớn nhất Việt Nam – thuộc tỉnh nào?", a:["Bắc Kạn","Thái Nguyên","Tuyên Quang","Lạng Sơn"], c:0},
    {q:"Dòng sông nào chảy qua thủ đô Hà Nội?", a:["Sông Hương","Sông Hồng","Sông Hàn","Sông Tiền"], c:1},
    {q:"Ruộng bậc thang Sa Pa là cảnh đẹp nổi tiếng của tỉnh nào?", a:["Lào Cai","Hà Giang","Yên Bái","Sơn La"], c:0},
    {q:"Vịnh Bái Tử Long thuộc tỉnh nào?", a:["Quảng Ninh","Hải Phòng","Thái Bình","Nam Định"], c:0},
    {q:"Tam Cốc – Bích Động được ví như “Nam thiên đệ nhị động” thuộc tỉnh nào?", a:["Ninh Bình","Nam Định","Thanh Hóa","Hà Nam"], c:0},

    // ----- Lịch sử – văn hóa -----
    {q:"Văn Miếu – Quốc Tử Giám được xây dựng dưới triều đại nào?", a:["Trần","Lê","Lý","Nguyễn"], c:2},
    {q:"Hoàng thành Thăng Long được UNESCO công nhận là Di sản thế giới năm nào?", a:["1993","2003","2010","2015"], c:2},
    {q:"Chùa Một Cột nằm ở thành phố nào?", a:["Hải Phòng","Nam Định","Hà Nội","Huế"], c:2},
    {q:"Ai là người dời đô từ Hoa Lư về Thăng Long?", a:["Đinh Bộ Lĩnh","Lê Lợi","Lý Công Uẩn","Trần Hưng Đạo"], c:2},
    {q:"Cố đô Hoa Lư – kinh đô đầu tiên của nhà nước phong kiến Việt Nam – thuộc tỉnh nào?", a:["Ninh Bình","Nam Định","Thanh Hóa","Hà Nam"], c:0},
    {q:"Đền Hùng – nơi thờ các Vua Hùng – thuộc tỉnh nào?", a:["Phú Thọ","Vĩnh Phúc","Thái Nguyên","Tuyên Quang"], c:0},
    {q:"Hát Quan họ là dân ca nổi tiếng của vùng nào?", a:["Bắc Ninh","Quảng Nam","Cần Thơ","Thừa Thiên Huế"], c:0},
    {q:"Làng gốm Bát Tràng nằm ở thành phố nào?", a:["Hà Nội","Bắc Ninh","Hải Dương","Hưng Yên"], c:0},
    {q:"Múa rối nước là nghệ thuật dân gian đặc sắc của vùng nào?", a:["Đồng bằng Bắc Bộ","Tây Nguyên","Nam Bộ","Duyên hải miền Trung"], c:0},
    {q:"Lễ hội Lồng Tồng (xuống đồng) là lễ hội truyền thống của dân tộc nào?", a:["Tày – Nùng","Kinh","Khmer","Chăm"], c:0},

    // ----- Ẩm thực – Tết -----
    {q:"Loài hoa nào là biểu tượng của Tết ở miền Bắc?", a:["Hoa mai","Hoa đào","Hoa sen","Hoa cúc"], c:1},
    {q:"Bánh chưng – món ăn truyền thống ngày Tết – có hình gì?", a:["Hình tròn","Hình vuông","Hình chữ nhật","Hình tam giác"], c:1},
    {q:"Phở là món ăn nổi tiếng có nguồn gốc từ vùng nào?", a:["Miền Bắc","Miền Trung","Miền Nam","Tây Nguyên"], c:0},
    {q:"Chè Thái Nguyên nổi tiếng vì điều gì?", a:["Hương thơm đặc trưng","Vị đắng","Màu đỏ","Trồng ở biển"], c:0},

    // ----- Đoàn kết dân tộc -----
    {q:"Dân tộc Tày, Nùng chủ yếu sinh sống ở vùng nào?", a:["Trung du và miền núi phía Bắc","Tây Nguyên","Đồng bằng sông Cửu Long","Nam Trung Bộ"], c:0}
  ],

  // ======================== MIỀN TRUNG ========================
  trung: [
    // ----- Địa lý – danh thắng -----
    {q:"Đèo Hải Vân nằm giữa Huế và thành phố nào?", a:["Quy Nhơn","Đà Nẵng","Nha Trang","Vinh"], c:1},
    {q:"Phong Nha – Kẻ Bàng nổi tiếng thế giới với điều gì?", a:["Núi lửa","Hệ thống hang động","Rừng ngập mặn","Ruộng bậc thang"], c:1},
    {q:"Động Thiên Đường nằm trong vườn quốc gia nào?", a:["Phong Nha – Kẻ Bàng","Cúc Phương","Bạch Mã","Cát Tiên"], c:0},
    {q:"Sông nào chảy qua thành phố Huế thơ mộng?", a:["Sông Hương","Sông Đà","Sông Cửu Long","Sông Mã"], c:0},
    {q:"Cầu Tràng Tiền – biểu tượng của xứ Huế – bắc qua sông nào?", a:["Sông Hương","Sông Hàn","Sông Thu Bồn","Sông Mã"], c:0},
    {q:"Cầu Vàng nổi tiếng nằm ở khu du lịch nào?", a:["Fansipan","Bà Nà Hills","Tam Đảo","Đà Lạt"], c:1},
    {q:"Biển Mỹ Khê – một trong những bãi biển đẹp nhất hành tinh – nằm ở thành phố nào?", a:["Đà Nẵng","Quy Nhơn","Nha Trang","Huế"], c:0},
    {q:"Tháp Bà Ponagar nằm ở thành phố nào?", a:["Nha Trang","Đà Nẵng","Quy Nhơn","Phan Thiết"], c:0},
    {q:"Vườn quốc gia Bạch Mã thuộc tỉnh nào?", a:["Thừa Thiên Huế","Quảng Nam","Quảng Bình","Hà Tĩnh"], c:0},
    {q:"Phố cổ Hội An thuộc tỉnh nào?", a:["Quảng Nam","Quảng Ngãi","Quảng Bình","Quảng Trị"], c:0},
    {q:"Đà Lạt còn được gọi bằng tên thân thương nào?", a:["Thành phố ngàn hoa","Thành phố biển","Thành phố cảng","Thành phố công nghiệp"], c:0},
    {q:"Nhà thờ Con Gà là công trình kiến trúc nổi tiếng của thành phố nào?", a:["Đà Lạt","Buôn Ma Thuột","Pleiku","Kon Tum"], c:0},

    // ----- Lịch sử – văn hóa -----
    {q:"Kinh thành Huế là kinh đô của triều đại nào?", a:["Nhà Lý","Nhà Trần","Nhà Hồ","Nhà Nguyễn"], c:3},
    {q:"Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới năm nào?", a:["1993","1999","2003","2010"], c:0},
    {q:"Thành nhà Hồ – di sản thế giới – thuộc tỉnh nào?", a:["Thanh Hóa","Nghệ An","Hà Tĩnh","Quảng Bình"], c:0},
    {q:"Phố cổ nào nổi tiếng với những chiếc đèn lồng đủ sắc màu?", a:["Hội An","Hà Nội","Sa Pa","Mỹ Tho"], c:0},
    {q:"Thánh địa Mỹ Sơn là di tích của nền văn hóa nào?", a:["Óc Eo","Đông Sơn","Chăm Pa","Sa Huỳnh"], c:2},
    {q:"Nhã nhạc – nhạc cung đình Việt Nam – gắn với kinh đô nào?", a:["Thăng Long","Hoa Lư","Huế","Sài Gòn"], c:2},
    {q:"Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản năm nào?", a:["2003","2005","2008","2010"], c:1},

    // ----- Ẩm thực -----
    {q:"Mì Quảng là món đặc sản của miền nào?", a:["Miền Bắc","Miền Trung","Miền Nam","Tây Bắc"], c:1},
    {q:"Bún bò là đặc sản nổi tiếng của thành phố nào?", a:["Huế","Cần Thơ","Hải Phòng","Hà Nội"], c:0},
    {q:"Cao lầu là món ăn đặc trưng của địa danh nào?", a:["Hội An","Huế","Đà Nẵng","Quy Nhơn"], c:0},

    // ----- Đoàn kết dân tộc -----
    {q:"Người dân tộc nào sinh sống lâu đời ở vùng Tây Nguyên?", a:["Ê-đê, Gia-rai, Ba Na","Tày, Nùng","Khmer, Chăm","Mường, Thái"], c:0}
  ],

  // ======================== MIỀN NAM ========================
  nam: [
    // ----- Địa lý – danh thắng -----
    {q:"Thành phố Hồ Chí Minh có tên gọi cũ là gì?", a:["Thăng Long","Phú Xuân","Sài Gòn","Gia Định Thành"], c:2},
    {q:"Vùng nào được mệnh danh là vựa lúa lớn nhất cả nước?", a:["Đồng bằng sông Hồng","Đồng bằng sông Cửu Long","Tây Nguyên","Duyên hải Nam Trung Bộ"], c:1},
    {q:"Chợ nổi Cái Răng nằm ở thành phố nào?", a:["Cần Thơ","Vũng Tàu","Biên Hòa","Hải Phòng"], c:0},
    {q:"Bến Ninh Kiều – biểu tượng của xứ Tây Đô – nằm ở thành phố nào?", a:["Cần Thơ","Mỹ Tho","Long Xuyên","Rạch Giá"], c:0},
    {q:"Dòng Mê Kông chảy qua Việt Nam được gọi là sông gì?", a:["Sông Đà","Sông Hồng","Sông Đồng Nai","Sông Cửu Long"], c:3},
    {q:"Đảo lớn nhất Việt Nam là đảo nào?", a:["Cát Bà","Phú Quốc","Lý Sơn","Côn Đảo"], c:1},
    {q:"Mũi Cà Mau là điểm cực nào của đất liền Việt Nam?", a:["Cực Bắc","Cực Đông","Cực Tây","Cực Nam"], c:3},
    {q:"Mũi Né – nơi có đồi cát bay nổi tiếng – thuộc tỉnh nào?", a:["Bình Thuận","Ninh Thuận","Khánh Hòa","Bà Rịa – Vũng Tàu"], c:0},
    {q:"Côn Đảo thuộc tỉnh nào?", a:["Bà Rịa – Vũng Tàu","Cà Mau","Kiên Giang","Sóc Trăng"], c:0},
    {q:"Rừng tràm Trà Sư – điểm du lịch sinh thái nổi tiếng – thuộc tỉnh nào?", a:["An Giang","Đồng Tháp","Kiên Giang","Cà Mau"], c:0},
    {q:"Tượng Chúa Kitô Vua trên núi Nhỏ là biểu tượng của thành phố nào?", a:["Vũng Tàu","Nha Trang","Đà Nẵng","Quy Nhơn"], c:0},
    {q:"Vườn quốc gia Cát Tiên thuộc khu vực nào?", a:["Đông Nam Bộ","Đồng bằng sông Cửu Long","Tây Nguyên","Nam Trung Bộ"], c:0},

    // ----- Lịch sử – văn hóa -----
    {q:"Dinh Độc Lập – chứng tích lịch sử 30/4/1975 – nằm ở thành phố nào?", a:["TP. Hồ Chí Minh","Cần Thơ","Vũng Tàu","Biên Hòa"], c:0},
    {q:"Bến Nhà Rồng gắn với sự kiện lịch sử nào?", a:["Bác Hồ ra đi tìm đường cứu nước","Khởi nghĩa Nam Kỳ","Cách mạng tháng Tám","Chiến thắng Điện Biên Phủ"], c:0},
    {q:"Địa đạo Củ Chi nằm ở thành phố nào?", a:["Hà Nội","Đà Nẵng","Thành phố Hồ Chí Minh","Cần Thơ"], c:2},
    {q:"Miếu Bà Chúa Xứ nằm ở tỉnh nào?", a:["An Giang","Kiên Giang","Đồng Tháp","Vĩnh Long"], c:0},
    {q:"Đờn ca tài tử là loại hình nghệ thuật của miền nào?", a:["Miền Bắc","Miền Trung","Nam Bộ","Tây Bắc"], c:2},
    {q:"Đồng Tháp Mười nổi tiếng với loài hoa nào?", a:["Hoa sen","Hoa súng","Hoa mai","Hoa phượng"], c:0},

    // ----- Ẩm thực – Tết -----
    {q:"Loài hoa nào là biểu tượng của Tết ở miền Nam?", a:["Hoa đào","Hoa mai vàng","Hoa ban","Hoa phượng"], c:1},
    {q:"Bánh tét là món ăn không thể thiếu trong Tết của miền nào?", a:["Miền Nam","Chỉ miền Bắc","Chỉ Tây Nguyên","Không có miền nào"], c:0},
    {q:"Hủ tiếu – món ăn đặc trưng – gắn với vùng nào?", a:["Nam Bộ","Tây Bắc","Đông Bắc","Bắc Trung Bộ"], c:0},

    // ----- Đoàn kết dân tộc -----
    {q:"Dân tộc Kinh (Việt) chiếm khoảng bao nhiêu phần trăm dân số cả nước?", a:["Khoảng 86%","Khoảng 50%","Khoảng 70%","Khoảng 95%"], c:0},
    {q:"Dân tộc Khmer ở Nam Bộ thường tổ chức lễ hội truyền thống nào?", a:["Lễ hội Ok Om Bok","Lễ hội Lồng Tồng","Lễ hội Cồng chiêng","Lễ hội Chọi trâu"], c:0}
  ],

  // ============ CÂU HỎI CHUNG (dùng cho cả 3 vùng) ============
  chung: [
    // ----- Đất nước – con người -----
    {q:"Việt Nam có bao nhiêu dân tộc anh em cùng chung sống?", a:["54","53","55","56"], c:0},
    {q:"Quốc ca Việt Nam có tên là gì?", a:["Tiến quân ca","Giải phóng quân","Đoàn quân Việt Nam","Bình minh Việt Nam"], c:0},
    {q:"Việt Nam nằm ở khu vực nào của châu Á?", a:["Đông Nam Á","Đông Á","Nam Á","Trung Á"], c:0},
    {q:"Đất nước Việt Nam có hình dạng giống chữ gì?", a:["Chữ S","Chữ V","Chữ U","Chữ C"], c:0},
    {q:"Việt Nam có đường biên giới trên đất liền với mấy nước?", a:["3 nước","2 nước","4 nước","5 nước"], c:0},
    {q:"Loài hoa nào được xem là quốc hoa của Việt Nam?", a:["Hoa sen","Hoa đào","Hoa mai","Hoa hồng"], c:0},
    {q:"Trang phục truyền thống nổi tiếng nhất của phụ nữ Việt Nam là gì?", a:["Áo dài","Áo bà ba","Áo giao lĩnh","Áo chẽn"], c:0},
    {q:"Cây gì thường được ví như biểu tượng tinh thần kiên cường, đoàn kết của dân tộc Việt Nam?", a:["Cây tre","Cây đa","Cây bàng","Cây phượng"], c:0},

    // ----- Lịch sử – dấu mốc -----
    {q:"Ngày Quốc khánh nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là ngày nào?", a:["2/9","19/5","30/4","1/5"], c:0},
    {q:"Bác Hồ đọc Tuyên ngôn Độc lập tại quảng trường nào?", a:["Quảng trường Ba Đình","Quảng trường Tự Do","Quảng trường Đông Kinh Nghĩa Thục","Quảng trường Nhà hát Lớn"], c:0},
    {q:"Ngày Giải phóng miền Nam, thống nhất đất nước là ngày nào?", a:["30/4/1975","2/9/1945","7/5/1954","19/5/1890"], c:0},
    {q:"Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào năm nào?", a:["1954","1945","1968","1975"], c:0},
    {q:"Đảng Cộng sản Việt Nam được thành lập vào ngày nào?", a:["3/2/1930","2/9/1945","19/8/1945","22/12/1944"], c:0},
    {q:"Quân đội Nhân dân Việt Nam được thành lập vào ngày nào?", a:["22/12/1944","3/2/1930","26/3/1931","15/5/1941"], c:0},
    {q:"Chủ tịch Hồ Chí Minh sinh vào năm nào?", a:["1890","1900","1885","1911"], c:0},
    {q:"Vua Hùng dựng nước đầu tiên có tên là gì?", a:["Văn Lang","Âu Lạc","Đại Việt","Nam Việt"], c:0},
    {q:"Truyền thuyết “Con Rồng cháu Tiên” gắn với hai nhân vật nào?", a:["Lạc Long Quân và Âu Cơ","Sơn Tinh và Thủy Tinh","Thánh Gióng và mẹ","Mị Châu và Trọng Thủy"], c:0},

    // ----- Văn hóa – lễ Tết -----
    {q:"Tết Nguyên Đán còn được gọi là gì?", a:["Tết cổ truyền","Tết Trung thu","Tết Đoan Ngọ","Tết Hàn thực"], c:0},
    {q:"Ngày Nhà giáo Việt Nam là ngày nào?", a:["20/11","8/3","1/6","27/7"], c:0},
    {q:"Ngày Thương binh – Liệt sĩ là ngày nào?", a:["27/7","22/12","19/8","20/11"], c:0},
    {q:"Vịnh Hạ Long được UNESCO công nhận là Di sản Thiên nhiên Thế giới năm nào?", a:["1994","1993","2003","2010"], c:0},

    // ----- Đại đoàn kết dân tộc -----
    {q:"Ngày hội Đại đoàn kết toàn dân tộc được tổ chức vào ngày nào hằng năm?", a:["18/11","19/5","2/9","10/3"], c:0},
    {q:"Tổ chức nào tập hợp, xây dựng và củng cố khối đại đoàn kết toàn dân tộc?", a:["Mặt trận Tổ quốc Việt Nam","Hội Nông dân Việt Nam","Đoàn Thanh niên Cộng sản Hồ Chí Minh","Hội Liên hiệp Phụ nữ Việt Nam"], c:0},
    {q:"Câu nói “Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công” là của ai?", a:["Hồ Chí Minh","Phan Bội Châu","Võ Nguyên Giáp","Tôn Đức Thắng"], c:0}
  ]
};