import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";



actor {
  type Question = {
    text : Text;
    answers : [Text];
    correctAnswerIndex : Nat;
    topic : Text;
    explanation : Text;
  };

  module Question {
    public func compare(q1 : Question, q2 : Question) : Order.Order {
      switch (Text.compare(q1.topic, q2.topic)) {
        case (#equal) { Text.compare(q1.text, q2.text) };
        case (order) { order };
      };
    };
  };

  type Result = {
    name : Text;
    timestamp : Int;
    date : Text;
    topic : Text;
    score : Nat;
    total : Nat;
    percentage : Float;
  };

  module Result {
    public func compareByScoreDesc(a : Result, b : Result) : Order.Order {
      Nat.compare(b.score, a.score);
    };
  };

  type Results = Map.Map<Nat, Result>;

  // --- Questions: 25 February 2026 ---
  let questionBank : [Question] = [
    // Section 3 (Foot Massage)
    {
      text = "Urutan refleksologi biasanya dimulakan dengan kaki kanan";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Urutan Refleksologi";
      explanation = "Kebanyakan terapi refleksologi memulakan sesi dengan kaki kanan untuk keseimbangan dan konsistensi";
    },
    {
      text = "Teknik 'rolling' digunakan untuk mengurangkan ketegangan pada otot kaki";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Teknik Massa Kaki";
      explanation = "Teknik 'rolling' dapat mengurangkan ketegangan otot kerana pergerakan berulang yang lembut merangsang relaksasi otot.";
    },
    {
      text = "Pusat refleks bagi sistem pencernaan terletak pada bahagian tumit kaki";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Zon Refleks Kaki";
      explanation = "Pusat refleks sistem pencernaan sebenarnya terletak di kawasan lengkung kaki, bukan pada tumit.";
    },
    {
      text = "Tekanan kuat semasa urutan refleksologi sentiasa memberikan hasil yang lebih baik";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Teknik Massa Kaki";
      explanation = "Tekanan harus disesuaikan mengikut toleransi individu, dan bukannya tekanan kuat sentiasa diperlukan.";
    },
    {
      text = "Bahagian refleks bagi mata terletak pada jari kelingking kaki";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Zon Refleks Kaki";
      explanation = "Bahagian refleks bagi mata biasanya terletak pada ibu jari kaki, terutamanya di kawasan tengah.";
    },
    {
      text = "Sesi urutan refleksologi yang ringkas dapat membantu melegakan sakit kepala";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Manfaat Refleksologi";
      explanation = "Refleksologi telah terbukti membantu mengurangkan simptom sakit kepala melalui stimulasi titik refleks tertentu pada kaki.";
    },
    {
      text = "Penggunaan minyak tidak digalakkan semasa sesi refleksologi";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Cara Rawatan";
      explanation = "Minyak boleh digunakan untuk mengurangkan geseran dan meningkatkan keselesaan semasa urutan.";
    },
    {
      text = "Urutan refleksologi hanya boleh dilakukan oleh ahli terapist bertauliah";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Pengetahuan Refleksologi";
      explanation = "Walaupun berkualiti tinggi dan selamat, sesi refleksologi ringkas juga boleh dilakukan oleh individu terlatih dengan mengikuti panduan keselamatan.";
    },
    {
      text = "Teknik refleksologi bukan rawatan alternatif untuk masalah kesihatan mental";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Manfaat Refleksologi";
      explanation = "Refleksologi boleh memberi manfaat sebagai rawatan alternatif untuk mengurangkan tekanan dan kebimbangan mental.";
    },

    // Section 4.0 (Hand Massage)
    {
      text = "Urutan tangan tidak membantu meningkatkan peredaran darah setempat";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Urut Tangan";
      explanation = "Urutan tangan yang dilakukan dengan betul dapat meningkatkan peredaran darah di kawasan tangan dan lengan.";
    },
    {
      text = "Semua refleks bagi sistem badan manusia tersedia pada tapak tangan";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Zon Refleks Tangan";
      explanation = "Tidak semua refleks tubuh tersedia pada tapak tangan. Refleks kaki merangkumi bahagian yang lebih luas dan berpusat.";
    },
    {
      text = "Urutan tangan membantu melegakan simptom kekakuan sendi";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Manfaat Refleksologi";
      explanation = "Urutan tangan dapat membantu melegakan simptom kekakuan sendi dengan meningkatkan peredaran darah serta merangsang tisu lembut.";
    },
    {
      text = "Setiap jari tangan mewakili bahagian tubuh tertentu dalam refleksologi";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Anatomi Refleks Tangan";
      explanation = "Setiap jari tangan dalam refleksologi mewakili bahagian tertentu dalam tubuh mengikut rujukan peta refleks.";
    },
    {
      text = "Teknik tekanan tepat di tapak tangan membantu proses relaksasi mendalam";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Teknik Massa Tangan";
      explanation = "Tekanan tepat di tapak tangan merangsang titik saraf tertentu dan membantu proses relaksasi mendalam.";
    },

    // Section 4.1 (Foot & Hand Comparison)
    {
      text = "Refleksologi tangan dan kaki melibatkan PENGAKUAN pada titik refleks yang serupa";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Perbandingan Refleksologi Tangan & Kaki";
      explanation = "Prinsip asas adalah sama bagi kedua-dua refleksologi tangan dan kaki; kedua-duanya melibatkan stimulasi titik refleks bagi tujuan kesihatan holistik.";
    },
    {
      text = "Refleksologi kaki TIDAK membantu meningkatkan kualiti tidur serta mengurangkan insomnia";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Manfaat Refleksologi";
      explanation = "Teknik refleksologi telah terbukti secara klinikal membantu meningkatkan kualiti tidur serta mengurangkan simptom insomnia.";
    },
    {
      text = "Urutan refleksologi hanya perlu dilakukan apabila terdapat simptom spesifik";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Pengetahuan Refleksologi";
      explanation = "Urutan refleksologi dapat dilakukan secara berkala sebagai pencegahan dan juga rawatan simptom terapeutik.";
    },
    {
      text = "Refleksologi dapat membantu meningkatkan koordinasi anggota badan";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Manfaat Refleksologi";
      explanation = "Refleksologi membantu merangsang titik saraf motorik, sekaligus meningkatkan koordinasi anggota badan (motor skills).";
    },
    {
      text = "Tekanan tidak perlu disesuaikan berdasarkan incaran titik refleks";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 1;
      topic = "Teknik Refleksologi";
      explanation = "Tekanan perlu sentiasa disesuaikan mengikut keperluan individu dan incaran titik refleks tertentu oleh terapist.";
    },
    {
      text = "Urutan refleksologi adalah rawatan alternatif dan bukan pengganti kepada rawatan perubatan.";
      answers = ["Betul", "Salah"];
      correctAnswerIndex = 0;
      topic = "Pengetahuan Refleksologi";
      explanation = "Refleksologi adalah rawatan alternatif yang tidak boleh menggantikan rawatan perubatan konvensional.";
    },

    // --- Questions: 26 February 2026 ---
    // Section 5.1: Kontra Indikasi & Indikasi
    {
      text = "Apakah maksud `kontra indikasi` dalam refleksologi?";
      answers = [
        "Keadaan yang MENGHALANG rawatan refleksologi",
        "Teknik rawatan refleksologi khusus",
        "Penyakit yang boleh dirawat dengan refleksologi",
        "Alat yang digunakan dalam refleksologi"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Kontra indikasi bermaksud keadaan di mana rawatan refleksologi TIDAK BOLEH dilakukan kerana risiko komplikasi";
    },
    {
      text = "Antara berikut, yang manakah merupakan kontra indikasi untuk refleksologi tangan?";
      answers = [
        "Artritis pada tangan",
        "Sakit kepala",
        "Stres ringan",
        "Ketegangan otot"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Artritis menyebabkan sendi tangan meradang, kebengkakan, dan kesakitan. Sentuhan dan tekanan perlu dielakkan kerana boleh memburukkan keadaan.";
    },
    {
      text = "Apakah sebenarnya `edema` dalam konteks kontra indikasi refleksologi?";
      answers = [
        "Pembengkakan pada tisu badan akibat penimbunan cecair",
        "Sakit kepala berpanjangan",
        "Pembesaran jari tangan",
        "Kulit tangan menjadi kering"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Edema ialah keadaan di mana terjadi PEMBENGKAKAN pada tisu badan, termasuk tisu lembut, akibat PENGUMPULAN CECAIR secara berlebihan dalam tubuh.";
    },
    {
      text = "Manakah antara berikut ialah INDIKASI rawatan refleksologi tangan?";
      answers = [ "Sakit kepala", "Artritis", "Tromboembolisme", "Diabetes" ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Sakit kepala adalah antara indikasi rawatan kerana refleksologi boleh membantu melegakan gejala tersebut.";
    },
    {
      text = "Apakah maksud `gout` yang menjadi kontra indikasi refleksologi?";
      answers = [
        "Penyakit sendi yang menyebabkan pembengkakan pada sendi akibat lebihan asid urik",
        "Jangkitan bakteria pada tisu lembut",
        "Masalah penghadaman kronik",
        "Simptom kekurangan cecair tubuh"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Gout adalah sejenis penyakit sendi yang menyebabkan pembengkakan, ketegangan, dan KESAKITAN pada sendi akibat lebihan asid urik di dalam tubuh.";
    },
    {
      text = "Mengapakah refleksologi tidak disyorkan kepada klien hamil?";
      answers = [
        "Risiko rangsangan berlebihan boleh membahayakan janin",
        "Boleh merosakkan otot jantung",
        "Menurunkan tekanan darah secara berbahaya",
        "Boleh mengganggu sistem tulang"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Rangsangan tertentu boleh mengakibatkan pengecutan rahim yang berbahaya kepada janin jika dilakukan kepada ibu hamil.";
    },
    {
      text = "Penyakit berjangkit mana yang disenaraikan sebagai kontra indikasi refleksologi?";
      answers = [
        "Campak, COVID-19, AIDS",
        "Sakit kepala, arthritis, gout",
        "Diabetes, tekanan darah tinggi, anemia",
        "Gangguan usus, penyumbatan, jangkitan tisu lembut"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Penyakit berjangkit seperti campak, COVID-19, dan AIDS adalah kontra indikasi kerana mudah menular melalui sentuhan fizikal yang berpanjangan.";
    },
    {
      text = "Apakah kontra indikasi untuk rawatan pada tisu limfa permukaan (superficial lymph tissue)?";
      answers = [
        "Terdapat risiko rangsangan LIMFA yang berlebihan",
        "Rangsangan limfa tidak diperlukan",
        "Tisu limfa tidak memerlukan perhatian khusus",
        "Rawatan limfa boleh dilakukan pada sesi pertama"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Tisu limfa permukaan memerlukan perhatian khusus untuk mengelakkan stimulasi berlebihan atau pembuangan yang tidak sesuai mengikut keperluan tubuh.";
    },
    {
      text = "Langkah BERJAGA-JAGA pertama sebelum memulakan sesi refleksologi adalah ...";
      answers = [
        "Semak dan PERIKSA kontra indikasi dulu",
        "Membersihkan kawasan refleksologi",
        "Menilai tahap tekanan pelanggan",
        "Permulaan tekanan pada tisu kaki"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "SETIAP SESI refleksologi mesti bermula dengan semakan dan pemeriksaan menyeluruh ke atas kontradiksi untuk memastikan keselamatan pelanggan.";
    },
    {
      text = "Apa yang perlu DIBUANG sebelum memulakan refleksologi?";
      answers = [
        "Perhiasan, kanta lekap, dan alat bantu pendengaran",
        "Minyak wangi dan getah rambut",
        "Persalinan pakaian",
        "Peralatan rias wajah dan kasut"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Perhiasan, kanta lekap, dan alat bantu pendengaran boleh mengganggu rawatan refleksologi semasa tekanan diaplikasikan pada bahagian tubuh.";
    },
    {
      text = "Bagaimanakah urat varikos beri komplikasi kepada refleksologi?";
      answers = [
        "Pendarahan dan pembekuan darah boleh berlaku akibat tekanan pada kawasan bermasalah",
        "Hanya memberi rasa tidak selesa",
        "Tiada komplikasi kepada refleksologi",
        "Varikos berlaku pada kawasan kaki sahaja"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Rawatan refleksologi boleh mengakibatkan PENINGKATAN risiko pendarahan dan PEMBEKUAN darah akibat tekanan kuat di kawasan bermasalah.";
    },
    {
      text = "Apakah definisi 'epilepsi' dalam konteks kontra indikasi?";
      answers = [
        "Penyakit sawan yang boleh menyebabkan rangsangan otot yang tidak terkawal",
        "Kerosakan telinga lain akibat bunyi bising",
        "Penyakit penghadaman jangka panjang",
        "Komplikasi sendi dan tisu lembut"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Epilepsi adalah penyakit sawan di mana pesakit mengalami rangsangan dan pergerakan Otot yang TIDAK DAPAT DIKAWAL.";
    },
    {
      text = "Antara berikut, yang manakah dikaitkan dengan pembengkakan sendi akibat asid urik berlebihan?";
      answers = [ "Gout", "Diabetes", "Parkinson", "Dementia" ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Pembengkakan sendi dan rasa sakit akibat asid urik berlebihan adalah ciri utama penyakit GOUT.";
    },
    {
      text = "Osteoporosis merupakan kontra indikasi refleksologi kerana ...";
      answers = [
        "Tulang menjadi rapuh dan mudah patah akibat kehilangan kalsium",
        "Otot melemah kerana penuaan",
        "Tulang membesar dan mengeras",
        "Darah mudah membeku"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "OSTEOPOROSIS menyebabkan tulang menjadi rapuh dan mudah patah akibat penyerapan tulang berlebihan akibat kehilangan kalsium.";
    },
    {
      text = "Bagaimanakah tekanan refleksologi perlu diaplikasikan mengikut pertimbangan khas?";
      answers = [
        "Tekanan disesuaikan mengikut keperluan dan keselesaan pelanggan",
        "Tekanan kuat sahaja berkesan",
        "Tekanan sederhana tidak memberi apa-apa kelebihan",
        "Tiada keperluan untuk membandingkan tekanan"
      ];
      correctAnswerIndex = 0;
      topic = "Kontra Indikasi & Indikasi";
      explanation = "Tekanan perlu disesuaikan mengikut keselesaan pelanggan serta keperluan khusus berdasarkan keadaan individu.";
    },

    // --- Questions: 9 Mac 2026 ---
    // Indikasi & Kontraindikasi (Garis Panduan Kesihatan)
    {
      text = "Apakah yang dimaksudkan dengan 'indikasi' dalam rawatan refleksologi?";
      answers = [
        "Keadaan atau masalah kesihatan yang boleh mendapat manfaat daripada refleksologi",
        "Keadaan yang melarang rawatan refleksologi dilakukan",
        "Teknik urutan yang digunakan semasa rawatan",
        "Peralatan khas yang diperlukan semasa sesi"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Indikasi merujuk kepada kegunaan atau manfaat refleksologi iaitu keadaan atau masalah kesihatan yang sesuai dan boleh dibantu melalui rawatan refleksologi.";
    },
    {
      text = "Refleksologi membantu badan mencapai tahap kerehatan yang mendalam. Ini adalah indikasi untuk ...";
      answers = [
        "Mengurangkan tekanan (stres)",
        "Merawat jangkitan kuman",
        "Mengatasi trombosis",
        "Pemulihan selepas pembedahan"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Refleksologi membantu badan mencapai tahap kerehatan mendalam, menjadikannya pilihan rawatan yang baik untuk individu yang mengalami tekanan atau stres.";
    },
    {
      text = "Antara berikut, yang manakah merupakan INDIKASI rawatan refleksologi?";
      answers = [
        "Melancarkan peredaran darah",
        "Trombosis",
        "Osteoporosis",
        "Epilepsi"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Melancarkan peredaran darah adalah salah satu manfaat utama refleksologi. Trombosis, osteoporosis, dan epilepsi pula adalah kontraindikasi.";
    },
    {
      text = "Refleksologi boleh membantu pesakit yang mengalami insomnia. Ini termasuk dalam kategori indikasi ...";
      answers = [
        "Masalah tidur",
        "Masalah penghadaman",
        "Melancarkan peredaran darah",
        "Meningkatkan imunisasi"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Membantu pesakit yang mengalami insomnia atau sukar tidur adalah antara indikasi refleksologi di bawah kategori masalah tidur.";
    },
    {
      text = "Antara berikut, yang manakah BUKAN indikasi rawatan refleksologi?";
      answers = [
        "Trombosis (darah beku)",
        "Sakit kepala",
        "Sembelit",
        "Kelesuan badan"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Trombosis adalah kontraindikasi (dilarang) kerana manipulasi tisu boleh memecahkan bekuan darah dan menyebabkan komplikasi berbahaya. Sakit kepala, sembelit, dan kelesuan pula adalah indikasi.";
    },
    {
      text = "Refleksologi boleh membantu mengatasi sembelit dan kurang selera makan. Ini merupakan indikasi untuk ...";
      answers = [
        "Masalah penghadaman",
        "Masalah tidur",
        "Tekanan darah tinggi",
        "Gangguan jantung"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Sembelit dan kurang selera makan adalah masalah penghadaman yang boleh dibantu melalui rawatan refleksologi.";
    },
    {
      text = "Apakah yang dimaksudkan dengan 'kontraindikasi' dalam rawatan refleksologi?";
      answers = [
        "Keadaan di mana rawatan refleksologi perlu dielakkan atau tidak boleh dilakukan",
        "Manfaat utama rawatan refleksologi",
        "Teknik urutan kaki dan tangan yang berkesan",
        "Cara refleksologi meningkatkan sistem imun"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Kontraindikasi ialah keadaan yang melarang atau memerlukan rawatan refleksologi dielakkan kerana boleh membawa risiko atau komplikasi kepada pesakit.";
    },
    {
      text = "Mengapakah demam panas merupakan kontraindikasi refleksologi?";
      answers = [
        "Boleh menyebabkan rangsangan keterlaluan pada sistem imun",
        "Menyebabkan pelanggan mengantuk semasa rawatan",
        "Mengurangkan keberkesanan urutan",
        "Meningkatkan tekanan darah secara mendadak"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Semasa demam, badan sedang melawan jangkitan. Rawatan refleksologi boleh merangsang sistem imun secara berlebihan dan memburukkan keadaan.";
    },
    {
      text = "Trombosis adalah kontraindikasi refleksologi. Apakah itu trombosis?";
      answers = [
        "Pembekuan darah dalam salur darah",
        "Keradangan sendi jari tangan",
        "Kekurangan sel darah merah",
        "Penyakit kulit berjangkit"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Trombosis ialah pembentukan bekuan darah (thrombus) dalam salur darah. Urutan boleh memecahkan bekuan ini dan menyebabkan ia bergerak ke jantung, paru-paru, atau otak.";
    },
    {
      text = "Refleksologi TIDAK digalakkan terutamanya pada trimester pertama kehamilan kerana ...";
      answers = [
        "Terdapat risiko keguguran akibat rangsangan titik refleks tertentu",
        "Menyebabkan rasa mual yang teruk kepada ibu",
        "Meningkatkan tekanan darah ibu secara berbahaya",
        "Menyebabkan bayi bergerak terlalu aktif"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Pada trimester pertama, risiko keguguran adalah tinggi. Sesetengah titik refleks boleh merangsang pengecutan rahim jika ditekan, maka refleksologi perlu dielakkan.";
    },
    {
      text = "Dalam rawatan pesakit kanser, mengapakah refleksologi memerlukan langkah berjaga-jaga yang tinggi?";
      answers = [
        "Terdapat risiko sel kanser merebak melalui manipulasi tisu",
        "Refleksologi boleh menyembuhkan kanser sepenuhnya",
        "Refleksologi menyebabkan kesakitan yang melampau",
        "Kanser tidak berkaitan dengan sistem refleks"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Manipulasi tisu semasa refleksologi boleh merangsang peredaran darah dan limfa, yang membawa risiko sel kanser merebak ke bahagian tubuh lain.";
    },
    {
      text = "Antara berikut, yang manakah kontraindikasi refleksologi berkaitan kecederaan tempatan?";
      answers = [
        "Luka atau penyakit kulit pada kawasan yang hendak diurut",
        "Sembelit kronik",
        "Tekanan (stres) yang teruk",
        "Insomnia berpanjangan"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Kecederaan, luka terbuka, atau penyakit kulit pada kawasan yang hendak diurut adalah kontraindikasi kerana boleh menyebabkan jangkitan dan kesakitan yang lebih teruk.";
    },
    {
      text = "Refleksologi boleh membantu meningkatkan daya tahan tubuh secara semula jadi. Ini dikenali sebagai ...";
      answers = [
        "Meningkatkan imunisasi",
        "Melancarkan peredaran darah",
        "Melegakan kesakitan ringan",
        "Mengurangkan tekanan"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Salah satu indikasi refleksologi ialah kemampuannya membantu meningkatkan sistem imun atau daya tahan tubuh secara semula jadi.";
    },
    {
      text = "Selepas menjalani pembedahan pada kaki, lutut, atau pinggul, rawatan refleksologi ...";
      answers = [
        "Perlu dielakkan sehingga pemulihan sepenuhnya",
        "Sangat disyorkan untuk mempercepatkan pemulihan",
        "Boleh dilakukan selepas 24 jam",
        "Tidak memberi sebarang kesan kepada pesakit"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Selepas pembedahan, tisu, salur darah, dan saraf di kawasan berkenaan masih dalam proses pemulihan. Rawatan refleksologi boleh mengganggu proses ini.";
    },
    {
      text = "Refleksologi adalah rawatan tambahan (komplementari). Ini bermakna ...";
      answers = [
        "Ia tidak boleh menggantikan rawatan perubatan konvensional",
        "Ia adalah rawatan utama untuk semua penyakit",
        "Ia boleh sepenuhnya menggantikan ubatan moden",
        "Ia hanya sesuai untuk penyakit kronik sahaja"
      ];
      correctAnswerIndex = 0;
      topic = "Indikasi & Kontraindikasi (Garis Panduan)";
      explanation = "Refleksologi adalah rawatan komplementari yang membantu meningkatkan kesejahteraan, tetapi tidak boleh menggantikan rawatan perubatan konvensional. Pesakit perlu mendapatkan nasihat doktor untuk penyakit kronik.";
    }
  ];

  var nextResultId = 0;
  let results : Results = Map.empty<Nat, Result>();

  public query ({ caller }) func getAllQuestions() : async [Question] {
    questionBank.sort();
  };

  public query ({ caller }) func getQuestionsByTopic(topic : Text) : async [Question] {
    questionBank.filter(func(q) { q.topic == topic });
  };

  public query ({ caller }) func getQuestionByText(text : Text) : async Question {
    switch (questionBank.find(func(q) { q.text == text })) {
      case (null) { Runtime.trap("Question not found") };
      case (?question) { question };
    };
  };

  public query ({ caller }) func getQuestion(index : Nat) : async Question {
    if (index >= questionBank.size()) { Runtime.trap("Question not found") };
    questionBank[index];
  };

  public shared ({ caller }) func submitResult(name : Text, date : Text, topic : Text, score : Nat, total : Nat, percentage : Float) : async () {
    let result : Result = {
      name;
      date;
      topic;
      score;
      total;
      percentage;
      timestamp = Time.now();
    };

    results.add(nextResultId, result);
    nextResultId += 1;
  };

  public query ({ caller }) func getResults() : async [Result] {
    results.values().toArray().sort(Result.compareByScoreDesc);
  };
};
