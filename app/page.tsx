"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "5521965950086";

const situationOptions = [
  "Já tenho plano e quero reduzir o custo",
  "Já tenho plano e quero melhorar a rede",
  "Quero trocar de plano com aproveitamento de carência",
  "Ainda não tenho plano e quero contratar",
  "Busco um plano para minha empresa ou equipe",
];

const peopleOptions = ["Somente eu", "2 pessoas", "3 a 5 pessoas", "6 a 10 pessoas", "Empresa com 11 ou mais pessoas"];
const regionOptions = ["Barra e Recreio", "Zona Sul", "Tijuca e Grande Tijuca", "Méier e Zona Norte", "Baixada Fluminense", "Niterói e São Gonçalo", "Região dos Lagos", "Outra região do Rio de Janeiro", "Outro estado"];
const hospitalOptions = [
  "Copa Star",
  "Samaritano",
  "Samaritano Barra",
  "Clínica São Vicente",
  "Rede D'Or",
  "Pró-Cardíaco",
  "Casa de Saúde São José",
  "Complexo Hospitalar de Niterói",
  "Albert Einstein — São Paulo",
  "Sírio-Libanês — São Paulo",
  "Outro hospital",
  "Ainda não tenho preferência",
];
const budgetOptions = ["Até R$ 1.000 por mês", "De R$ 1.001 a R$ 2.000 por mês", "De R$ 2.001 a R$ 4.000 por mês", "De R$ 4.001 a R$ 7.000 por mês", "Acima de R$ 7.000 por mês", "Quero avaliar o melhor custo-benefício"];

type FormData = { name: string; phone: string; email: string; situation: string; people: string; region: string; hospital: string; budget: string; consent: boolean };
const initialForm: FormData = { name: "", phone: "", email: "", situation: "", people: "", region: "", hospital: "", budget: "", consent: false };

function SelectField({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <span className="select-wrap">
        <select id={id} required value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="" disabled>Selecione uma opção</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <ChevronDown aria-hidden="true" size={18} />
      </span>
    </label>
  );
}

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [touched, setTouched] = useState(false);
  const complete = useMemo(() => Boolean(form.name.trim() && form.phone.replace(/\D/g, "").length >= 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.situation && form.people && form.region && form.hospital && form.budget && form.consent), [form]);

  function update<Key extends keyof FormData>(key: Key, value: FormData[Key]) { setForm((current) => ({ ...current, [key]: value })); }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!complete) return;
    const message = [
      `Olá, Bruna! Meu nome é ${form.name.trim()} e preenchi o formulário da Eleve Group.`, "",
      `Situação: ${form.situation}`, `Pessoas no plano: ${form.people}`, `Região: ${form.region}`,
      `Hospital de preferência: ${form.hospital}`, `Faixa mensal: ${form.budget}`,
      `Meu WhatsApp: ${form.phone}`, `Meu e-mail: ${form.email}`, "",
      "Gostaria de receber uma análise personalizada.",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <section className="brand-panel" aria-labelledby="brand-title">
        <div className="brand-top" id="brand-title">
          <img className="official-logo" src="/eleve-group-logo-oficial.png" alt="Eleve Group, BS Consultoria Estratégica" />
        </div>
        <div className="brand-copy">
          <h1>Seu plano de saúde pode entregar mais.</h1>
          <p className="intro">Conte o que você busca. Eu analiso sua necessidade e mostro as opções com clareza, incluindo custos, rede e pontos de atenção.</p>
          <div className="promise-list" aria-label="Como funciona">
            <div><Check size={17} aria-hidden="true" /><span>Leva cerca de 1 minuto</span></div>
            <div><Check size={17} aria-hidden="true" /><span>Atendimento direto com Bruna Santos</span></div>
            <div><Check size={17} aria-hidden="true" /><span>Sem compromisso</span></div>
          </div>
        </div>
        <p className="signature">Bruna Santos <span>Consultora de planos de saúde</span></p>
      </section>

      <section className="form-panel" aria-labelledby="form-title">
        <form onSubmit={submit} noValidate>
          <header className="form-header"><p className="step">ANÁLISE PERSONALIZADA</p><h2 id="form-title">Vamos encontrar o plano certo para você?</h2><p>Preencha abaixo para iniciar seu atendimento pelo WhatsApp.</p></header>
          <div className="form-grid">
            <label className="field full" htmlFor="name"><span>Como posso te chamar?</span><input id="name" autoComplete="name" required placeholder="Nome completo" value={form.name} onChange={(e) => update("name", e.target.value)} /></label>
            <label className="field" htmlFor="phone"><span>Seu WhatsApp com DDD</span><input id="phone" inputMode="tel" autoComplete="tel" required placeholder="(21) 99999-9999" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
            <label className="field" htmlFor="email"><span>Seu melhor e-mail</span><input id="email" type="email" autoComplete="email" required placeholder="voce@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
            <SelectField id="situation" label="Qual é a sua situação atual?" value={form.situation} options={situationOptions} onChange={(value) => update("situation", value)} />
            <SelectField id="people" label="Quem será incluído?" value={form.people} options={peopleOptions} onChange={(value) => update("people", value)} />
            <SelectField id="region" label="Em qual região você mora?" value={form.region} options={regionOptions} onChange={(value) => update("region", value)} />
            <SelectField id="hospital" label="Qual hospital você gostaria de ter acesso?" value={form.hospital} options={hospitalOptions} onChange={(value) => update("hospital", value)} />
            <div className="full"><SelectField id="budget" label="Qual faixa mensal você considera adequada?" value={form.budget} options={budgetOptions} onChange={(value) => update("budget", value)} /></div>
            <label className="consent full"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>Autorizo o contato da Eleve Group sobre esta solicitação. Meus dados serão usados somente para o atendimento.</span></label>
          </div>
          {touched && !complete && <p className="error" role="alert">Complete todos os campos para liberar o atendimento.</p>}
          <button className="whatsapp-button" type="submit" aria-disabled={!complete}><MessageCircle size={21} aria-hidden="true" />Conversar no WhatsApp</button>
          <p className="privacy"><ShieldCheck size={15} aria-hidden="true" /> Seus dados ficam protegidos e não são vendidos ou compartilhados.</p>
        </form>
      </section>
    </main>
  );
}
