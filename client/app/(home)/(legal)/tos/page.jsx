import Link from 'next/link';

export const metadata = {
  title: 'hizmet şartları'
};

export default function Page() {
  return (
    <div className='my-20 text-sm'>
      <div className='text-3xl font-black'>Hizmet Şartları</div>
      <div className='text-muted-foreground'>
        Son güncelleme tarihi: 14.09.2024
      </div>
      <div className='mt-5 text-muted-foreground'>
        Lütfen bu hizmet şartlarını dikkatlice okuyunuz. Bu platformu kullanarak
        aşağıdaki koşulları kabul etmiş sayılırsınız.
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>1. Genel Koşullar</div>
        <div className='text-muted-foreground'>
          Bu web uygulaması (bundan sonra &quot;Hizmet&quot;), BSD 3-Clause
          lisansı altında özgür yazılım olarak dağıtılan bir yazılım üzerine
          inşa edilmiştir. Hizmeti kullanarak, bu lisans ve aşağıda belirtilen
          diğer koşulları kabul etmiş sayılırsınız. Lisans hakkında daha fazla
          bilgi almak için{' '}
          <Link
            href='https://github.com/lareii/copl.uk/blob/master/LICENSE'
            className='underline'
          >
            buraya
          </Link>{' '}
          göz atabilirsiniz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          2. Hesap Oluşturma ve Kullanıcı Sorumlulukları
        </div>
        <div className='text-muted-foreground'>
          Hizmeti kullanmak için geçerli bir hesap oluşturmanız gerekmektedir.
          Verdiğiniz bilgilerin doğru ve eksiksiz olduğundan emin olmalısınız.
          Hesap bilgilerinizin güvenliği sizin sorumluluğunuzdadır.
        </div>
        <br />
        <div className='text-muted-foreground'>Kullanıcılar:</div>
        <ul className='text-muted-foreground list-disc ml-5 mt-1'>
          <li>
            Hizmeti sadece yasal ve etik sınırlar içinde kullanmakla yükümlüdür.
          </li>
          <li>
            Diğer kullanıcıların haklarını ihlal eden ya da platformun
            işleyişini olumsuz etkileyen davranışlardan kaçınmalıdır.
          </li>
        </ul>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          3. İçerik ve Telif Hakları
        </div>
        <div className='text-muted-foreground'>
          Kullanıcılar tarafından paylaşılan içerikler, ilgili kullanıcıların
          sorumluluğundadır. Kullanıcılar, platformda paylaştıkları tüm
          içeriklerin yürürlükteki yasalara ve telif hakkı kurallarına uygun
          olduğunu taahhüt eder.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>4. Garanti Feragatnamesi</div>
        <div className='text-muted-foreground'>
          Hizmet, &quot;olduğu gibi&quot; ve &quot;mevcut haliyle&quot;{' '}
          sunulmaktadır. BSD 3-Clause lisansı altında, bu hizmetin
          kullanılabilirliği, doğruluğu, performansı veya diğer nitelikleri
          konusunda herhangi bir garanti verilmez. Hizmeti kullanmanız tamamen
          kendi sorumluluğunuzdadır. Sağlayıcı; herhangi bir dolaylı, tesadüfi,
          özel veya sonuçsal zarardan sorumlu tutulamaz.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>5. Gizlilik Politikası</div>
        <div className='text-muted-foreground'>
          Hizmeti kullanırken kişisel verilerinizin nasıl toplandığı, işlendiği
          ve korunduğu hakkında bilgi almak için{' '}
          <Link href='/privacy' className='underline'>
            gizlilik politikasına
          </Link>{' '}
          göz atabilirsiniz. Hizmeti kullanarak bu politikayı kabul etmiş
          sayılırsınız.
        </div>
      </div>
      <div>
        <div className='mt-10 text-lg font-bold'>
          6. Değişiklikler ve Sonlandırma
        </div>
        <div className='text-muted-foreground'>
          Hizmet sağlayıcı, herhangi bir zaman hizmet şartlarını değiştirme
          hakkını saklı tutar. Yapılan değişiklikler platformda duyurulacak ve
          yürürlüğe girecektir. Kullanıcılar, değişikliklerden sonra hizmeti
          kullanmaya devam ettiklerinde bu şartları kabul etmiş sayılacaktır.
        </div>
      </div>
    </div>
  );
}
