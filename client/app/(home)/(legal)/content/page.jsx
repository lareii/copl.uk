import Link from 'next/link';

export const metadata = {
  title: 'içerik politikası'
};

export default function Page() {
  return (
    <div className='my-20 text-sm'>
      <div className='text-3xl font-black'>İçerik Politikası</div>
      <div className='text-muted-foreground'>
        Platformda herkesin kendini özgürce ifade etmesini ve yaratıcı içerik
        paylaşmasını destekliyoruz. Ancak sağlıklı ve güvenli bir topluluk
        oluşturmak amacıyla bazı kurallar belirlemiş bulunuyoruz. Bu kurallar,
        platformumuzu tüm kullanıcılar için daha iyi bir yer haline getirmeyi
        amaçlamaktadır.
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>1. Uygunsuz İçerik</div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Şiddet, nefret, ayrımcılık, tehdit ve taciz içeren içeriklere izin
            verilmemektedir.
          </li>
          <li>
            Irk, din, cinsiyet, cinsel yönelim, yaş, engellilik gibi konularda
            nefret söylemi içeren paylaşımlar yasaktır.
          </li>
          <li>
            Kişisel saldırılar veya zorbalık içeren içeriklere izin verilmez.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          2. Zararlı ve Tehlikeli İçerik
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Kendine zarar verme, şiddet veya tehlikeli aktiviteleri teşvik eden
            içeriklere izin verilmemektedir.
          </li>
          <li>
            Yasal olmayan maddelerin kullanımını teşvik eden içerikler yasaktır.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>3. Yasa Dışı Faaliyetler</div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Her türlü yasa dışı faaliyeti teşvik eden, planlayan veya bu tür
            faaliyetlerde bulunan içerikler yasaktır.
          </li>
          <li>
            Telif haklarını ihlal eden veya izinsiz kullanılan içerikler
            paylaşılamaz.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          4. Kişisel Bilgilerin Paylaşımı
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Başkalarının kişisel bilgilerini izinsiz olarak paylaşmak yasaktır.
          </li>
          <li>
            Özel mesajlaşma içeriklerinin izinsiz paylaşılmasına izin verilmez.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          5. Spam ve Manipülatif İçerik
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Platformumuzda sahte hesaplar veya otomatik araçlarla yapılan spam
            içeriklere izin verilmemektedir.
          </li>
          <li>
            Kullanıcıları yanıltıcı veya manipülatif amaçlarla yönlendiren
            içerikler yasaktır.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          6. Cinsel İçerik ve Yetişkinlere Yönelik Paylaşımlar
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Pornografik veya cinsel içerikli materyallere izin verilmemektedir.
          </li>
          <li>
            Cinselliği istismar eden, küçükleri hedef alan veya uygunsuz
            görseller paylaşan içerikler yasaktır.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          7. Topluluk Kuralları İhlali
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Kuralların ihlal edilmesi durumunda içeriğiniz kaldırılabilir ve
            hesabınız askıya alınabilir.
          </li>
          <li>
            Tekrar eden veya ağır ihlaller hesabınızın kalıcı olarak
            kapatılmasına neden olabilir.
          </li>
        </ul>
      </div>
      <div className='text-muted-foreground mt-10'>
        Topluluğumuzu güvenli ve saygılı bir yer haline getirebiliriz.
        Platformumuzu kullanırken diğer kullanıcılarla saygılı bir şekilde
        etkileşim kurmanızı ve bu kurallara uymanızı rica ediyoruz. Eğer
        platformumuzda uygunsuz içeriklerle karşılaşırsanız veya herhangi bir
        ihlal durumu olduğunu düşünüyorsanız lütfen bize bildirin.
      </div>
    </div>
  );
}
