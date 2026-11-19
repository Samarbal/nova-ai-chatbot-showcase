import { FormEvent, RefObject, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { DEMO_FAQS } from '../data/faqs';
import { UI_DICTIONARY } from '../data/i18n';
import { DEMO_POLICIES } from '../data/policies';
import { InquiryProductId, Language } from '../types/nova';

interface ContactSectionProps {
  language: Language;
  selectedProductId: InquiryProductId;
  onSelectedProductChange: (productId: InquiryProductId) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

interface FormValues {
  name: string;
  email: string;
  productId: InquiryProductId;
  message: string;
}

type ValidationErrorKey = {
  name?: 'nameRequired';
  email?: 'emailInvalid';
  message?: 'messageRequired';
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection({
  language,
  selectedProductId,
  onSelectedProductChange,
  nameInputRef,
}: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_DICTIONARY[language];

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    productId: selectedProductId || 'general',
    message: '',
  });
  const [errorKeys, setErrorKeys] = useState<ValidationErrorKey>({});
  const [submittedPreview, setSubmittedPreview] = useState<FormValues | null>(null);
  const [activeAccordionTab, setActiveAccordionTab] = useState<'policies' | 'faqs'>('policies');
  const [openItemId, setOpenItemId] = useState<string>(DEMO_POLICIES[0]?.id ?? '');

  useEffect(() => {
    setValues((prev) => ({ ...prev, productId: selectedProductId }));
    setSubmittedPreview(null);
  }, [selectedProductId]);

  const resolveProductName = (productId: InquiryProductId): string => {
    if (productId === 'general') {
      return t.contact.form.generalOption;
    }
    const found = FEATURED_PRODUCTS.find((item) => item.id === productId);
    return found ? found.name[language] : t.contact.form.generalOption;
  };

  const validate = (form: FormValues): ValidationErrorKey => {
    const nextErrors: ValidationErrorKey = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'nameRequired';
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'emailInvalid';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'messageRequired';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrorKeys(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmittedPreview({
      name: values.name.trim(),
      email: values.email.trim(),
      productId: values.productId,
      message: values.message.trim(),
    });
  };

  const handleResetDemo = () => {
    setSubmittedPreview(null);
    setErrorKeys({});
    setValues((prev) => ({
      ...prev,
      message: '',
    }));
  };

  const handleTabSwitch = (tab: 'policies' | 'faqs') => {
    setActiveAccordionTab(tab);
    setOpenItemId(tab === 'policies' ? DEMO_POLICIES[0]?.id ?? '' : DEMO_FAQS[0]?.id ?? '');
  };

  const toggleAccordionItem = (id: string) => {
    setOpenItemId((current) => (current === id ? '' : id));
  };

  const selectedProductLabel = resolveProductName(values.productId);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#F6F5FF] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-2.5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-[3px] w-7 bg-[#1629D8]" />
            <p className="text-xs font-bold tracking-wide text-[#1629D8]">
              {t.contact.eyebrow}
            </p>
          </div>
          <h2
            id="contact-heading"
            className="text-balance text-2xl font-extrabold tracking-tight text-[#111325] sm:text-3xl"
          >
            {t.contact.heading}
          </h2>
          <p className="text-sm leading-relaxed text-[#4B506B] sm:text-base">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Inquiry Form Card */}
          <div className="rounded-3xl border border-[#111325]/10 bg-white p-6 sm:p-8 lg:col-span-6">
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#1629D8]/12 bg-[#EAE8FA] p-4 text-xs leading-relaxed text-[#111325]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1629D8]" aria-hidden="true" />
              <span>
                <strong className="font-bold text-[#111325]">
                  {t.contact.demoNoticeTitle}
                </strong>{' '}
                {t.contact.demoNoticeBody}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {submittedPreview ? (
                <motion.div
                  key="submitted-preview"
                  role="status"
                  aria-live="polite"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5 rounded-2xl border border-[#1629D8]/25 bg-[#F6F5FF] p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1629D8] text-[#B5F25B]">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-[#111325]">
                        {t.contact.confirmation.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#4B506B]">
                        {t.contact.confirmation.description}
                      </p>
                    </div>
                  </div>

                  <dl className="space-y-3 border-t border-[#111325]/10 pt-4 text-sm">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                      <dt className="font-medium text-[#4B506B]">
                        {t.contact.confirmation.fieldName}
                      </dt>
                      <dd className="font-bold text-[#111325]">{submittedPreview.name}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                      <dt className="font-medium text-[#4B506B]">
                        {t.contact.confirmation.fieldEmail}
                      </dt>
                      <dd dir="ltr" className="font-latin font-bold text-[#111325]">
                        {submittedPreview.email}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                      <dt className="font-medium text-[#4B506B]">
                        {t.contact.confirmation.fieldProduct}
                      </dt>
                      <dd className="font-bold text-[#1629D8]">
                        {resolveProductName(submittedPreview.productId)}
                      </dd>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <dt className="font-medium text-[#4B506B]">
                        {t.contact.confirmation.fieldMessage}
                      </dt>
                      <dd className="rounded-xl border border-[#111325]/10 bg-white p-3.5 text-sm text-[#111325]">
                        {submittedPreview.message}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={handleResetDemo}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#111325]/20 bg-white px-5 py-2 text-sm font-bold text-[#111325] transition-colors duration-150 hover:border-[#1629D8] hover:text-[#1629D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8]"
                  >
                    {t.contact.confirmation.resetButton}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="inquiry-form"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-product"
                      className="block text-sm font-bold text-[#111325]"
                    >
                      {t.contact.form.productLabel}
                    </label>
                    <select
                      id="inquiry-product"
                      name="product"
                      value={values.productId}
                      onChange={(e) => {
                        const nextId = e.target.value;
                        setValues((prev) => ({ ...prev, productId: nextId }));
                        onSelectedProductChange(nextId);
                      }}
                      className="min-h-[46px] w-full rounded-xl border border-[#111325]/20 bg-white px-3.5 py-2.5 text-sm text-[#111325] transition-colors duration-150 focus:border-[#1629D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8]"
                    >
                      <option value="general">{t.contact.form.generalOption}</option>
                      {FEATURED_PRODUCTS.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name[language]} (${product.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-name"
                        className="block text-sm font-bold text-[#111325]"
                      >
                        {t.contact.form.nameLabel}
                      </label>
                      <input
                        ref={nameInputRef}
                        id="inquiry-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, name: e.target.value }));
                          if (errorKeys.name) {
                            setErrorKeys((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errorKeys.name)}
                        aria-describedby={errorKeys.name ? 'inquiry-name-error' : undefined}
                        placeholder={t.contact.form.namePlaceholder}
                        className={`min-h-[46px] w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#111325] placeholder:text-[#4B506B]/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                          errorKeys.name
                            ? 'border-red-600'
                            : 'border-[#111325]/20 focus:border-[#1629D8]'
                        }`}
                      />
                      {errorKeys.name && (
                        <p
                          id="inquiry-name-error"
                          className="flex items-center gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{t.contact.validation[errorKeys.name]}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="inquiry-email"
                        className="block text-sm font-bold text-[#111325]"
                      >
                        {t.contact.form.emailLabel}
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errorKeys.email) {
                            setErrorKeys((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errorKeys.email)}
                        aria-describedby={errorKeys.email ? 'inquiry-email-error' : undefined}
                        placeholder={t.contact.form.emailPlaceholder}
                        className={`font-latin min-h-[46px] w-full rounded-xl border bg-white px-3.5 py-2.5 text-left text-sm text-[#111325] placeholder:text-[#4B506B]/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                          errorKeys.email
                            ? 'border-red-600'
                            : 'border-[#111325]/20 focus:border-[#1629D8]'
                        }`}
                      />
                      {errorKeys.email && (
                        <p
                          id="inquiry-email-error"
                          className="flex items-center gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{t.contact.validation[errorKeys.email]}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-message"
                      className="block text-sm font-bold text-[#111325]"
                    >
                      {t.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      required
                      value={values.message}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, message: e.target.value }));
                        if (errorKeys.message) {
                          setErrorKeys((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errorKeys.message)}
                      aria-describedby={errorKeys.message ? 'inquiry-message-error' : undefined}
                      placeholder={
                        values.productId !== 'general'
                          ? t.contact.form.messagePlaceholderProduct(selectedProductLabel)
                          : t.contact.form.messagePlaceholderDefault
                      }
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#111325] placeholder:text-[#4B506B]/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                        errorKeys.message
                          ? 'border-red-600'
                          : 'border-[#111325]/20 focus:border-[#1629D8]'
                      }`}
                    />
                    {errorKeys.message && (
                      <p
                        id="inquiry-message-error"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{t.contact.validation[errorKeys.message]}</span>
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#B5F25B] px-6 py-3 text-base font-bold text-[#111325] transition-colors duration-150 hover:bg-[#c5f779] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8]"
                  >
                    {t.contact.form.submitButton}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Policies & FAQ Accordion Column */}
          <div className="space-y-5 lg:col-span-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#111325]">{t.contact.accordion.title}</h3>
                <p className="text-xs text-[#4B506B]">{t.contact.accordion.subtitle}</p>
              </div>

              <div
                role="tablist"
                aria-label={t.accessibility.policyTabs}
                className="inline-flex items-center gap-1 self-start rounded-xl border border-[#111325]/10 bg-[#EAE8FA] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeAccordionTab === 'policies'}
                  onClick={() => handleTabSwitch('policies')}
                  className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                    activeAccordionTab === 'policies'
                      ? 'bg-[#1629D8] text-white'
                      : 'text-[#4B506B] hover:text-[#111325]'
                  }`}
                >
                  {t.contact.accordion.policiesTab}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeAccordionTab === 'faqs'}
                  onClick={() => handleTabSwitch('faqs')}
                  className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                    activeAccordionTab === 'faqs'
                      ? 'bg-[#1629D8] text-white'
                      : 'text-[#4B506B] hover:text-[#111325]'
                  }`}
                >
                  {t.contact.accordion.faqsTab} ({DEMO_FAQS.length})
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#111325]/10 overflow-hidden rounded-3xl border border-[#111325]/10 bg-white">
              {activeAccordionTab === 'policies'
                ? DEMO_POLICIES.map((policy) => {
                    const isOpen = openItemId === policy.id;
                    const panelId = `policy-panel-${policy.id}`;
                    const buttonId = `policy-btn-${policy.id}`;

                    return (
                      <div key={policy.id}>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleAccordionItem(policy.id)}
                          className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors duration-150 hover:bg-[#F6F5FF]/70 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1629D8]"
                        >
                          <div className="space-y-0.5">
                            <span className="block text-sm font-bold text-[#111325]">
                              {policy.title[language]}
                            </span>
                            <span className="block text-xs text-[#4B506B]">
                              {policy.category === 'shipping'
                                ? t.contact.accordion.shippingTag
                                : t.contact.accordion.returnsTag}{' '}
                              · {policy.summary[language]}
                            </span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#4B506B] transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#1629D8]' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-t border-[#111325]/8 bg-[#F6F5FF]"
                            >
                              <div className="px-5 py-4 text-sm leading-relaxed text-[#4B506B]">
                                {policy.details[language]}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                : DEMO_FAQS.map((faq) => {
                    const isOpen = openItemId === faq.id;
                    const panelId = `faq-panel-${faq.id}`;
                    const buttonId = `faq-btn-${faq.id}`;

                    return (
                      <div key={faq.id}>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggleAccordionItem(faq.id)}
                          className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors duration-150 hover:bg-[#F6F5FF]/70 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1629D8]"
                        >
                          <span className="text-sm font-bold text-[#111325]">
                            {faq.question[language]}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#4B506B] transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#1629D8]' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={panelId}
                              role="region"
                              aria-labelledby={buttonId}
                              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-t border-[#111325]/8 bg-[#F6F5FF]"
                            >
                              <div className="px-5 py-4 text-sm leading-relaxed text-[#4B506B]">
                                {faq.answer[language]}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
