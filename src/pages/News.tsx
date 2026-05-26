import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const newsData = [
  {
    id: 1,
    title: '朱鹮酒业荣获 2026 年度有机产品金奖',
    summary: '在第十三届中国国际有机食品博览会上，我司生产的有机黄酒凭借其卓越品质荣获金奖，这是对朱鹮酒业多年来坚持有机种植、匠心酿造的肯定。',
    content: '在第十三届中国国际有机食品博览会上，朱鹮酒业的有机黄酒产品凭借其卓越的品质和严格的生产标准，在众多参赛产品中脱颖而出，荣获 2026 年度有机产品金奖。这一荣誉不仅是对朱鹮酒业多年来坚持有机种植、匠心酿造的肯定，也是对我们守护生态环境理念的认可。朱鹮酒业将继续秉持"守护生态，传承匠心，酿造健康"的企业使命，为消费者提供更多优质的有机酒类产品。',
    image: 'https://picsum.photos/seed/award/600/300',
    category: '公司荣誉',
    date: '2026-05-20',
    views: 1268
  },
  {
    id: 2,
    title: '秦岭生态保护合作签约仪式圆满举行',
    summary: '朱鹮酒业与秦岭生态保护基金会正式签署战略合作协议，每年将投入销售额的 2% 用于朱鹮栖息地保护和生态修复项目。',
    content: '5 月 15 日，陕西朱鹮酒业有限公司与秦岭生态保护基金会在汉中市举行战略合作签约仪式。根据协议，朱鹮酒业承诺每年将投入销售额的 2% 用于朱鹮栖息地保护和生态修复项目。这一合作将有效推动秦岭地区生物多样性的保护，为朱鹮等珍稀野生动物创造更加优越的生存环境。公司负责人表示，朱鹮酒业因朱鹮而得名，保护朱鹮及其栖息地是企业义不容辞的社会责任。',
    image: 'https://picsum.photos/seed/sign/600/300',
    category: '企业活动',
    date: '2026-05-15',
    views: 856
  },
  {
    id: 3,
    title: '传统酿酒技艺传承人收徒仪式',
    summary: '我司隆重举行传统酿酒技艺传承人收徒仪式，第三代酿酒大师张建国老先生正式收徒，确保千年酿酒工艺代代相传。',
    content: '5 月 10 日，朱鹮酒业传统酿酒技艺传承人收徒仪式在公司酿造基地隆重举行。第三代酿酒大师、省级非物质文化遗产传承人张建国老先生正式收下 8 名弟子，将千年传统酿酒工艺传授给新一代传承人。收徒仪式严格按照传统礼仪进行，体现了对传统文化的尊重和传承。张建国老先生表示，传统酿酒工艺是老祖宗留下的宝贵财富，一定要传承下去，发扬光大。',
    image: 'https://picsum.photos/seed/ceremony/600/300',
    category: '文化传承',
    date: '2026-05-10',
    views: 723
  },
  {
    id: 4,
    title: '朱鹮酒业 2026 春季新品发布会圆满成功',
    summary: '公司成功举办 2026 春季新品发布会，推出三款高端养生酒产品，融合传统配方与现代科技，获得与会嘉宾一致好评。',
    content: '5 月 1 日，朱鹮酒业 2026 春季新品发布会在公司总部隆重举行。本次发布会推出了三款高端养生酒新品，分别是人参养生酒、枸杞养生酒和黄芪养生酒。新产品在传统黄酒酿造工艺基础上，精选名贵中药材，采用现代生物提取技术，既保留了黄酒的营养成分，又充分发挥了中药材的养生功效。发布会现场，来自全国各地的经销商、媒体和行业专家对新产品给予了高度评价。',
    image: 'https://picsum.photos/seed/launch/600/300',
    category: '新品发布',
    date: '2026-05-01',
    views: 1542
  },
  {
    id: 5,
    title: '有机种植基地迎来丰收季',
    summary: '位于秦岭深处的有机种植基地迎来黑米和糯米的丰收，工人们正在田间忙碌收割，确保新米及时送往酿造车间。',
    content: '金秋时节，位于秦岭深处的朱鹮酒业有机种植基地迎来丰收季。数百名工人正在田间忙碌收割有机黑米和糯米。这些有机谷物采用传统农耕方式种植，不使用化肥农药，从源头确保产品品质。收割后的新米将被立即送往酿造车间，用于新一批黄酒的生产。公司负责人表示，有机种植基地的丰收为保障全年产品质量和产量奠定了坚实基础。',
    image: 'https://picsum.photos/seed/harvest/600/300',
    category: '种植基地',
    date: '2026-04-25',
    views: 967
  },
  {
    id: 6,
    title: '朱鹮酒业亮相丝绸之路国际博览会',
    summary: '公司受邀参加丝绸之路国际博览会，展位设计融合朱鹮元素与传统文化，吸引众多国内外客商驻足参观。',
    content: '4 月 20 日，第五届丝绸之路国际博览会在西安国际会议中心开幕。朱鹮酒业作为陕西省重点龙头企业受邀参展，展位设计融合朱鹮元素与传统文化，充分展示了企业的品牌形象和产品特色。展会期间，公司展出的有机黄酒、黑米酒、养生酒等产品吸引了来自 30 多个国家和地区的客商参观咨询，并与多家海外经销商达成初步合作意向。',
    image: 'https://picsum.photos/seed/expo/600/300',
    category: '展会活动',
    date: '2026-04-20',
    views: 1134
  }
];

export const News: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">新闻资讯</h1>
          <p className="text-xl text-green-100">了解朱鹮酒业的最新动态</p>
        </div>
      </section>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map(news => (
            <Link key={news.id} to={`/news/${news.id}`}>
              <Card className="border-0 shadow-lg overflow-hidden card-hover h-full">
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-600 text-white">{news.category}</Badge>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="font-bold text-lg text-green-800 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.summary}</p>
                  <div className="flex items-center text-gray-400 text-xs">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {news.views} 次阅读
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
