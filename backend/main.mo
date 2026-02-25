import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
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

  let questions : [Question] = [
    // 3.0 What is Pain?
    {
      text = "Apakah maksud ‘kesakitan’ dalam konteks refleksologi?";
      answers = [
        "Memberikan tanda masalah pada organ tubuh",
        "Hanya rasa tidak selesa tanpa makna",
        "Isyarat sistem peredaran darah sahaja",
        "Bermaksud penyakit serius sudah terjadi",
      ];
      correctAnswerIndex = 0;
      topic = "Apakah Kesakitan?";
      explanation = "Kesakitan ialah tekanan atau rasa tidak selesa sebagai RESPON FIZIKAL DARIPADA ORGAN YANG TERLIBAT, menandakan masalah pada organ tertentu.";
    },
    {
      text = "Terdapat dua jenis gangguan pada tubuh: Gangguan Luar dan Gangguan Dalaman. Manakah contoh berikut termasuk dalam Gangguan Luar?";
      answers = ["Cedera akibat kemalangan", "Tekanan jiwa yang berpanjangan", "Kegagalan fungsi organ dalaman", "Tekanan darah tinggi yang diwarisi"];
      correctAnswerIndex = 0;
      topic = "4.0 Sebab Tercetus Tubuh Tidak Sempurna / Penyakit";
      explanation = "Contoh Gangguan Luar termasuk kecederaan fizikal, kemalangan, atau trauma pada tubuh.";
    },
    {
      text = "Manakah contoh berikut termasuk dalam Gangguan Dalaman?";
      answers = [
        "Tekanan mental",
        "Kecederaan akibat kemalangan",
        "Patah tulang",
        "Sakit akibat lebam",
      ];
      correctAnswerIndex = 0;
      topic = "4.0 Penyebab Gangguan Dalaman";
      explanation = "Gangguan Dalaman merujuk kepada faktor psikologi seperti tekanan mental, emosi tidak stabil, atau trauma jiwa.";
    },
    {
      text = "Bagaimanakah kedua-dua Gangguan Luar dan Gangguan Dalaman boleh mempengaruhi tubuh fizikal manusia?";
      answers = [
        "Kedua-duanya menyebabkan penyakit fizikal",
        "Hanya Gangguan Luar memberi kesan fizikal",
        "Gangguan Dalaman hanya mempengaruhi minda",
        "Gangguan Luar tidak memerlukan rawatan",
      ];
      correctAnswerIndex = 0;
      topic = "4.0 Gabungan Gangguan Tubuh & Minda";
      explanation = "Kedua-dua jenis gangguan, sama ada luar atau dalaman, boleh membawa kepada masalah fizikal dan penyakit.";
    },

    // 4.1 Kenal Pasti Gejala Penyakit
    {
      text = "Bagaimanakah ahli terapi refleksologi mengenal pasti organ tubuh yang bermasalah melalui zon refleksologi di tangan?";
      answers = [
        "Melalui pemeriksaan titik tekanan pada kawasan tertentu",
        "Dengan menekan kuat pada semua kawasan tangan",
        "Menggunakan alat elektronik canggih",
        "Berdasarkan ramalan nasib seseorang",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Kenal Pasti Gejala Penyakit";
      explanation = "Ahli terapi menggunakan titik tekanan pada zon refleksologi tangan untuk mengenal pasti masalah pada organ berkaitan.";
    },
    {
      text = "Jika seseorang merasa sangat sakit dan terdapat bengkak ketara apabila titik refleksologi ditekan, apakah yang dimaksudkan keadaan tersebut?";
      answers = [
        "Petunjuk penyakit pada organ berkaitan",
        "Tidak ada masalah kesihatan",
        "Menandakan keletihan biasa",
        "Hanya rasa tidak selesa sementara",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Tanda-Tanda Penyakit";
      explanation = "Kesakitan melampau dan bengkak pada titik refleksologi menandakan masalah pada organ berkaitan.";
    },
    {
      text = "Jika tekanan pada titik refleksologi TIDAK menyebabkan kesakitan dan tiada bengkak, apakah maksudnya?";
      answers = [
        "Organ adalah sihat",
        "Menandakan masalah serius",
        "Hanya keletihan biasa",
        "Tanda kesihatan kurang baik",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Penilaian Kesihatan Reflex";
      explanation = "Jika tiada rasa sakit atau bengkak, organ yang berkaitan dianggap sihat.";
    },
    {
      text = "Apakah perkara penting yang perlu dilakukan oleh pengamal sebelum menjalankan refleksologi tangan kepada klien?";
      answers = [
        "Menilai tahap keberkesanan",
        "Merawat kawasan lain dahulu",
        "Mengabaikan kesihatan pelanggan",
        "Merujuk kepada pakar tanpa analisis",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Merancang Rawatan Individual";
      explanation = "Penting untuk menilai keadaan individu klien agar rawatan dapat dirancang dengan berkesan dan selamat.";
    },
    {
      text = "Seberapa kerap rawatan refleksologi perlu diulang untuk mendapatkan hasil terbaik?";
      answers = [
        "Secara berkala sehingga sembuh",
        "Sekali sudah memadai",
        "Setiap hari tanpa henti",
        "Rawatan tidak perlu berulang",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Kekerapan Rawatan";
      explanation = "Rawatan refleksologi harus dilakukan secara berkala sehingga masalah dapat diatasi dan tubuh berfungsi dengan baik.";
    },
    {
      text = "Antara berikut, manakah penyakit yang dikategorikan sebagai MUDAH DIRAWAT menggunakan teknik refleksologi tangan?";
      answers = [
        "Masalah sendi",
        "Kencing manis",
        "Tekanan darah tinggi",
        "Gangguan jantung",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Penyakit Mudah Dirawat";
      explanation = "Penyakit yang berkaitan dengan masalah sendi dan otot lebih mudah dirawat menggunakan refleksologi tangan.";
    },
    {
      text = "Penyakit manakah berikut dianggap SUKAR DIRAWAT dengan refleksologi tangan?";
      answers = [
        "Gangguan jantung",
        "Sakit kepala",
        "Sakit belakang",
        "Sakit otot",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Penyakit Sukar Dirawat";
      explanation = "Gangguan fungsi organ utama seperti jantung adalah sukar dirawat hanya menggunakan teknik refleksologi tangan.";
    },
    {
      text = "Apakah maknanya tekanan pada titik refleksi hanya menyebabkan rasa sakit ringan atau sedikit tidak selesa?";
      answers = [
        "Gangguan kecil pada organ berkaitan",
        "Penyakit serius pada organ tersebut",
        "Hanya masalah tekanan sahaja",
        "Boleh diabaikan tanpa rawatan",
      ];
      correctAnswerIndex = 0;
      topic = "4.1 Tanda Gangguan Ringan";
      explanation = "Kesakitan ringan menunjukkan masalah kecil atau awal pada organ yang berkaitan dengan titik tersebut.";
    },
  ];

  public query ({ caller }) func getAllQuestions() : async [Question] {
    questions.sort();
  };

  public query ({ caller }) func getQuestionsByTopic(topic : Text) : async [Question] {
    questions.filter(func(q) { q.topic == topic });
  };

  public query ({ caller }) func getQuestionByText(text : Text) : async Question {
    switch (questions.find(func(q) { q.text == text })) {
      case (null) { Runtime.trap("Question not found") };
      case (?question) { question };
    };
  };

  public query ({ caller }) func getQuestion(index : Nat) : async Question {
    if (index >= questions.size()) { Runtime.trap("Question not found") };
    questions[index];
  };
};
