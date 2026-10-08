import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { formatPrice, getChange, getUnit } from "@/lib/format";

interface Product {
    id: number
    nameBn: string
    image: string
    unit: string
    today: number
    change: { dir: string; pct: number }
}

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
    const products: Product[] = await res.json()
    return (
        <div className="border-b border-base-300 bg-base-100 text-sm">
            <MarqueeText className="py-2" direction="left" duration={90}>
                {products.map(p => {
                    const change = getChange(p.change)
                    return (
                        <span key={p.id} className="flex items-center gap-1.5 border-r border-base-200 px-4">
                            <span>{p.image}</span>
                            <span className="font-medium">{p.nameBn}</span>
                            <span>{formatPrice(p.today)} টাকা/{getUnit(p.unit)}</span>
                            <span className={`font-semibold ${change.color}`}>
                                {change.symbol} {change.pct}%
                            </span>
                        </span>
                    )
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
