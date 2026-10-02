export default async function RuheraumPage() {
    return <div>
        <h1 className="mb-2">Ruheraum</h1>
        <div className="mb-4">
            <p>In der <a href="https://maps.app.goo.gl/ZL38SpiUpLBBr4456" className="text-dlrg-red">Turnhaller der Herderschule</a> steht ein Ruheraum zur Verfügung.</p>
            <p className="font-bold">Für persönliche Dinge wird keine Haftung übernommen!</p>
        </div>
        <div>
            <h2>Hausregeln</h2>
            <ul className="list-disc ml-6">
                <li>Auf andere Rücksicht nehmen</li>
                <li>Sich leise verhalten</li>
                <li>Schuhe vorm Betreten der Turnhalle ausziehen</li>
                <li className="font-bold">Nichts zurücklassen - insbesondere keinen Müll</li>
                <li className="font-bold">Verursachte Verschmutzungen und Verunreinigungen selbstständig beseitigen</li>
            </ul>
        </div>
    </div>
}