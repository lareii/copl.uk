export const metadata = {
  title: 'gizlilik politikası'
};

export default function Page() {
  return (
    <div className='my-20 text-sm'>
      <div className='text-3xl font-black'>Gizlilik Politikası</div>
      <div className='text-muted-foreground'>
        Son güncelleme tarihi: 14.09.2024
      </div>
      <div className='mt-5 text-muted-foreground'>
        Bu gizlilik politikası, web uygulaması (bundan sonra &quot;Hizmet&quot;)
        aracılığıyla toplanan kişisel verilerinizin nasıl işlendiğini ve
        korunduğunu açıklar. Hizmeti kullanarak bu gizlilik politikasında
        belirtilen uygulamaları kabul etmiş sayılırsınız.
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>1. Toplanan Bilgiler</div>
        <div className='text-muted-foreground'>
          Hizmeti kullanırken sizden farklı türde bilgiler toplayabiliriz. Bu
          bilgiler, hizmetimizin işleyişi ve geliştirilmesi için
          kullanılacaktır:
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            <span className='font-bold'>Kişisel Bilgiler</span>: Hesap
            oluşturduğunuzda adınız, kullanıcı adınız ve e-posta adresiniz talep
            edilir.
          </li>
          <li>
            <span className='font-bold'>Cihaz Bilgileri</span>: Hizmete erişmek
            için kullandığınız cihazın IP adresi toplanabilir.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>2. Bilgilerin Kullanımı</div>
        <div className='text-muted-foreground'>
          Topladığımız bilgileri kullanıcı deneyiminizi iyileştirmek,
          hizmetimizi geliştirmek ve güvenliğinizi sağlamak için kullanabiliriz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>3. Çerezler</div>
        <div className='text-muted-foreground'>
          Çerezler, tarayıcınızda saklanan küçük veri dosyalarıdır. Hizmetimizde
          kullanıcı deneyimini geliştirmek ve oturum yönetimini sağlamak
          amacıyla çerezler kullanıyoruz. Çerezleri kabul etmek istemiyorsanız,
          siteyi kullanmaya devam etmemelisiniz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          4. Bilgilerin Paylaşılması
        </div>
        <div className='text-muted-foreground'>
          Kişisel verilerinizi, aşağıdaki durumlar dışında üçüncü taraflarla
          paylaşmayız:
        </div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>Yasal bir zorunluluk olduğunda,</li>
          <li>
            Hizmeti sunmamız için gerekli hizmet sağlayıcıları ile (örneğin,
            barındırma hizmetleri),
          </li>
          <li>Kullanıcı onayı alındığında.</li>
        </ul>
        <div className='mt-1 text-muted-foreground'>
          Bu üçüncü taraflar, bilgilerinizi yalnızca hizmetlerimizi sunma
          amacıyla kullanmakta olup, gizlilik ve güvenlik standartlarına uymakla
          yükümlüdürler.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>5. Bilgilerin Güvenliği</div>
        <div className='text-muted-foreground'>
          Kişisel bilgilerinizin gizliliği ve güvenliği bizim için önemlidir.
          Yetkisiz erişim, değiştirme, ifşa ya da yok etme riskine karşı makul
          teknik ve organizasyonel önlemler almaktayız. Ancak, internet
          üzerinden yapılan hiçbir veri iletimi %100 güvenli değildir. Bu
          nedenle, bilgilerinizi korumak için çaba göstersek de tam güvenliği
          garanti edemeyiz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          6. Verilerin Saklanma Süresi
        </div>
        <div className='text-muted-foreground'>
          Topladığımız kişisel bilgileri gerektiği sürece saklarız. Kullanıcının
          talebi üzerine, veriler makul bir süre içinde silinir.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          7. Üçüncü Taraf Bağlantıları
        </div>
        <div className='text-muted-foreground'>
          Hizmet, diğer web sitelerine veya hizmetlere bağlantılar içerebilir.
          Bu üçüncü taraf sitelerin gizlilik uygulamaları bizim kontrolümüzde
          değildir. Bağlantı verdiğimiz sitelerin gizlilik politikalarını
          incelemenizi öneririz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>8. Çocukların Gizliliği</div>
        <div className='text-muted-foreground'>
          Hizmet, 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşından
          küçük bir kullanıcının bilgilerini bilerek toplamayız. Eğer 13 yaş
          altındaki bir çocuğa ait kişisel bilgiler toplandığını öğrenirsek, bu
          bilgileri derhal sileceğiz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>9. Değişiklikler</div>
        <div className='text-muted-foreground'>
          Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler
          platformda yayınlandığında yürürlüğe girer. Kullanıcılar bu tür
          değişikliklerden sonra hizmeti kullanmaya devam ederlerse güncellenmiş
          politikayı kabul etmiş sayılırlar.
        </div>
      </div>
    </div>
  );
}
