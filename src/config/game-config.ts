export const GAME_CONFIG = {
  INITIAL_RESOURCES: { budget: 50, zufriedenheit: 50, personal: 50, effizienz: 50 },
  DRIFT_PER_CARD: 1,
  ESCALATION_INTERVAL: 10,
  ESCALATION_MULTIPLIER_BASE: 1.0,
  ESCALATION_MULTIPLIER_STEP: 0.3,
  HINT_WEAK_MAX: 7,
  NO_REPEAT_WINDOW: 15,
  TUTORIAL_CARD_COUNT: 3,
  MAX_RESOURCE: 100,
  MIN_RESOURCE: 0,
  WARNING_THRESHOLD_LOW: 20,
  WARNING_THRESHOLD_HIGH: 80,
  DRAG_DECISION_THRESHOLD: 100, // px
  HINT_SHOW_THRESHOLD: 40, // px drag before hints show
} as const;

export const RESOURCE_LABELS: Record<string, string> = {
  budget: 'Budget',
  zufriedenheit: 'Zufriedenheit',
  personal: 'Personal',
  effizienz: 'Effizienz',
};

export const RESOURCE_ICONS: Record<string, string> = {
  budget: '💰',
  zufriedenheit: '😊',
  personal: '👥',
  effizienz: '⚡',
};

export const GAME_OVER_MESSAGES: Record<string, { title: string; text: string }> = {
  budget_0: {
    title: 'Musterhausen ist pleite.',
    text: 'Der Kämmerer weint. Die Bürostühle werden versteigert. Ihre Abfindung besteht aus Druckerpatronen.',
  },
  budget_100: {
    title: 'Sonderprüfung eingeleitet.',
    text: 'Der Landesrechnungshof fragt, warum Musterhausen auf Geld sitzt, statt es auszugeben. Sie werden „beratend versetzt".',
  },
  zufriedenheit_0: {
    title: 'Die Bürger stehen vor dem Rathaus.',
    text: 'Mit Fackeln. Und Widerspruchs-Formularen in Dreifachausführung. Die Polizei kommt auch — aber die steht bei den Bürgern.',
  },
  zufriedenheit_100: {
    title: 'Verdächtig beliebt.',
    text: 'Die Bürger lieben Sie. Zu sehr. Die Kommunalaufsicht ermittelt wegen Gefälligkeitsentscheidungen. Ihr Ruf ist Ihr Verhängnis.',
  },
  personal_0: {
    title: 'Letzte Mitarbeiterin weg.',
    text: 'Sie bearbeiten jetzt alles selbst. Urlaubsanträge, Baugenehmigungen, Kanalarbeiten. In 8–12 Wochen wird geantwortet.',
  },
  personal_100: {
    title: 'Stellenplan gesprengt.',
    text: 'Der Personalrat applaudiert, der Kämmerer fällt in Ohnmacht. Erste gestrichene Stelle: Ihre. Herzlichen Glückwunsch.',
  },
  effizienz_0: {
    title: 'Statik gefährdet.',
    text: 'Der Aktenstapel hat die Tragfähigkeit des Gebäudes überschritten. Räumung angeordnet. Das Amt ist jetzt im Freien.',
  },
  effizienz_100: {
    title: 'Task-Force eingesetzt.',
    text: 'Null Rückstand. Alle Akten erledigt. Das gab es in der deutschen Verwaltungsgeschichte noch nie. Eine Kommission prüft, ob hier überhaupt geprüft wird.',
  },
};
