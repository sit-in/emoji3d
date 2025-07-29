"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "生成一个 3D Emoji 需要多长时间？",
    answer: "通常只需要 3-10 秒！我们使用最先进的 AI 技术，能够快速分析你的照片并生成高质量的 3D 海岛风格 Emoji。",
  },
  {
    question: "支持哪些图片格式和大小？",
    answer: "我们支持 JPG 和 PNG 格式的图片。为了获得最佳效果，建议上传清晰的正面照片。",
  },
  {
    question: "生成的 3D Emoji 可以商用吗？",
    answer: "个人使用完全免费！如需商业用途，请联系我们获取商业授权。我们提供灵活的授权方案。",
  },
  {
    question: "我的照片会被保存吗？",
    answer: "我们非常重视用户隐私。上传的原始照片仅用于生成 3D Emoji，不会被永久保存。生成完成后会自动删除。",
  },
  {
    question: "如果对生成效果不满意怎么办？",
    answer:
      "你可以重新上传照片或尝试不同角度的照片。我们的 AI 会根据不同的面部特征生成独特的效果。如有问题，随时联系客服。",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">常见问题</h2>
          <p className="text-xl text-gray-600">关于 3D Emoji 生成的一切疑问，这里都有答案</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border-0 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-orange-50 transition-colors">
                <span className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">还有其他问题？</p>
          <a
            href="mailto:support@emoji3d.com"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
          >
            联系客服 →
          </a>
        </div>
      </div>
    </section>
  )
}
