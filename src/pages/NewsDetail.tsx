import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const newsData = [
  {
    id: 1,
    title: '朱鹮酒业荣获 2026 年度有机产品金奖',
    summary: '在第十三届中国国际有机食品博览会上，我司生产的有机黄酒凭借其卓越品质荣获金奖。',
    content: `在第十三届中国国际有机食品博览会上，朱鹮酒业的有机黄酒产品凭借其卓越的品质和严格的生产标准，在众多参赛产品中脱颖而出，荣获 2026 年度有机产品金奖。

这一荣誉不仅是对朱鹮酒业多年来坚持有机种植、匠心酿造的肯定，也是对我们守护生态环境理念的认可。

朱鹮酒业将继续秉持"守护生态，传承匠心，酿造健康"的企业使命，为消费者提供更多优质的有机酒类产品。

此次获奖的有机黄酒采用秦岭深处有机种植基地的黑米为原料，经传统工艺发酵 180 天酿制而成，酒体醇厚，营养丰富，富含多种氨基酸和微量元素，是健康养生的理想选择。`,
    image: 'https://picsum.photos/seed/award/800/400',
    category: '公司荣誉',
    date: '2026-05-20',
    views: 1268,
    author: '品牌部'
  },
  {
    id: 2,
    title: '秦岭生态保护合作签约仪式圆满举行',
    summary: '朱鹮酒业与秦岭生态保护基金会正式签署战略合作协议。',
    content: `5 月 15 日，陕西朱鹮酒业有限公司与秦岭生态保护基金会在汉中市举行战略合作签约仪式。

根据协议，朱鹮酒业承诺每年将投入销售额的 2% 用于朱鹮栖息地保护和生态修复项目。这一合作将有效推动秦岭地区生物多样性的保护，为朱鹮等珍稀野生动物创造更加优越的生存环境。

公司负责人表示，朱鹮酒业因朱鹮而得名，保护朱鹮及其栖息地是企业义不容辞的社会责任。

未来，双方将在朱鹮保护、生态宣传、有机农业推广等多个领域开展深入合作，共同守护秦岭的绿水青山。`,
    image: 'https://picsum.photos/seed/sign/800/400',
    category: '企业活动',
    date: '2026-05-15',
    views: 856,
    author: '行政部'
  },
  {
    id: 3,
    title: '传统酿酒技艺传承人收徒仪式',
    summary: '第三代酿酒大师张建国老先生正式收徒，确保千年酿酒工艺代代相传。',
    content: `5 月 10 日，朱鹮酒业传统酿酒技艺传承人收徒仪式在公司酿造基地隆重举行。

第三代酿酒大师、省级非物质文化遗产传承人张建国老先生正式收下 8 名弟子，将千年传统酿酒工艺传授给新一代传承人。

收徒仪式严格按照传统礼仪进行，体现了对传统文化的尊重和传承。

张建国老先生表示，传统酿酒工艺是老祖宗留下的宝贵财富，一定要传承下去，发扬光大。新收的徒弟们将经过为期三年的系统学习，全面掌握传统酿酒技艺的精髓。`,
    image: 'https://picsum.photos/seed/ceremony/800/400',
    category: '文化传承',
    date: '2026-05-10',
    views: 723,
    author: '文化部'
  },
  {
    id: 4,
    title: '朱鹮酒业 2026 春季新品发布会圆满成功',
    summary: '推出三款高端养生酒产品，融合传统配方与现代科技。',
    content: `5 月 1 日，朱鹮酒业 2026 春季新品发布会在公司总部隆重举行。

本次发布会推出了三款高端养生酒新品，分别是人参养生酒、枸杞养生酒和黄芪养生酒。新产品在传统黄酒酿造工艺基础上，精选名贵中药材，采用现代生物提取技术，既保留了黄酒的营养成分，又充分发挥了中药材的养生功效。

发布会现场，来自全国各地的经销商、媒体和行业专家对新产品给予了高度评价。多款产品在发布会现场便获得了经销商的预订。`,
    image: 'https://picsum.photos/seed/launch/800/400',
    category: '新品发布',
    date: '2026-05-01',
    views: 1542,
    author: '市场部'
  },
  {
    id: 5,
    title: '有机种植基地迎来丰收季',
    summary: '位于秦岭深处的有机种植基地迎来黑米和糯米的丰收。',
    content: `金秋时节，位于秦岭深处的朱鹮酒业有机种植基地迎来丰收季。

数百名工人正在田间忙碌收割有机黑米和糯米。这些有机谷物采用传统农耕方式种植，不使用化肥农药，从源头确保产品品质。

收割后的新米将被立即送往酿造车间，用于新一批黄酒的生产。

公司负责人表示，有机种植基地的丰收为保障全年产品质量和产量奠定了坚实基础。今年预计产量比去年增长 20%。`,
    image: 'https://picsum.photos/seed/harvest/800/400',
    category: '种植基地',
    date: '2026-04-25',
    views: 967,
    author: '生产部'
  },
  {
    id: 6,
    title: '朱鹮酒业亮相丝绸之路国际博览会',
    summary: '展位设计融合朱鹮元素与传统文化，吸引众多国内外客商驻足参观。',
    content: `4 月 20 日，第五届丝绸之路国际博览会在西安国际会议中心开幕。

朱鹮酒业作为陕西省重点龙头企业受邀参展，展位设计融合朱鹮元素与传统文化，充分展示了企业的品牌形象和产品特色。

展会期间，公司展出的有机黄酒、黑米酒、养生酒等产品吸引了来自 30 多个国家和地区的客商参观咨询，并与多家海外经销商达成初步合作意向。

此次参展是朱鹮酒业开拓国际市场的重要一步，未来公司将继续加大海外市场拓展力度。`,
    image: 'https://picsum.photos/seed/expo/800/400',
    category: '展会活动',
    date: '2026-04-20',
    views: 1134,
    author: '国际部'
  }
];

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find(n => n.id === Number(id));

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">新闻不存在</h1>
          <Link to="/news">
            <Button className="bg-green-600 hover:bg-green-700">返回新闻列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/news" className="text-green-600 hover:underline">← 返回新闻列表</Link>
        </div>

        {/* Article */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            <Badge className="mb-4 bg-green-600 text-white">{news.category}</Badge>
            
            <h1 className="text-4xl font-bold text-green-800 mb-4">{news.title}</h1>
            
            <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 pb-6 border-b">
              <span>发布时间：{news.date}</span>
              <span>作者：{news.author}</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {news.views} 次阅读
              </span>
            </div>

            <img src={news.image} alt={news.title} className="w-full h-80 object-cover rounded-lg mb-8" />

            <div className="prose prose-lg max-w-none">
              {news.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsDetail;
