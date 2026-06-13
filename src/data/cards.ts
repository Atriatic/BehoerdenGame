import { Card } from '../types';

export const CARDS: Card[] = [
  // ─── TUTORIAL CARDS ──────────────────────────────────────────────────────────
  {
    id: 't_willkommen',
    isTutorial: true,
    category: 'personal',
    title: 'Willkommen in Musterhausen',
    situation:
      'Es ist Ihr erster Tag als Amtsleiter. Auf dem Schreibtisch türmt sich ein Stapel Akten. Die Sekretärin Frau Brandt schaut Sie erwartungsvoll an: \'Wo soll ich anfangen?\'',
    leftOption: {
      label: 'Akten nach Priorität sortieren',
      effects: { budget: 0, zufriedenheit: 3, personal: 2, effizienz: 8 },
    },
    rightOption: {
      label: 'Alles der Reihe nach bearbeiten',
      effects: { budget: 0, zufriedenheit: 1, personal: 0, effizienz: 5 },
    },
  },
  {
    id: 't_drucker',
    isTutorial: true,
    category: 'personal',
    character: 'Klaus',
    title: 'Klaus und der Drucker',
    situation:
      'Klaus aus der IT erscheint in Ihrer Tür: \'Der Amtsdrucker ist schon wieder kaputt. Aber ich hab meinen privaten Drucker dabei — darf ich den anschließen?\'',
    leftOption: {
      label: 'Nein, das ist nicht regelkonform',
      effects: { budget: 0, zufriedenheit: -3, personal: -2, effizienz: -5 },
    },
    rightOption: {
      label: 'Ja, vorübergehend genehmigt',
      effects: { budget: -2, zufriedenheit: 2, personal: 3, effizienz: 6 },
      unlocksCard: 'p_drucker_follow',
    },
  },
  {
    id: 't_parkausweis',
    isTutorial: true,
    category: 'buerger',
    title: 'Parkausweis dringend',
    situation:
      'Frau Schneider, 78, steht seit 45 Minuten am Schalter. Ihr Parkausweis für Schwerbehinderte ist abgelaufen. Das Formular fehlt, aber der Bedarf ist offensichtlich.',
    leftOption: {
      label: 'Formular nachholen lassen',
      effects: { budget: 0, zufriedenheit: -6, personal: 0, effizienz: 3 },
    },
    rightOption: {
      label: 'Ausnahme genehmigen',
      effects: { budget: -3, zufriedenheit: 8, personal: 0, effizienz: -4 },
    },
  },

  // ─── CHAIN CARD – Klaus IT ───────────────────────────────────────────────────
  {
    id: 'p_drucker_follow',
    isChainCard: true,
    category: 'personal',
    character: 'Klaus',
    title: 'Feuer in der IT-Abteilung',
    situation:
      'Klaus ruft panisch durch die Tür: \'Der private Drucker hat Feuer gefangen! Ich hab\'s geahnt — die Netzspannung war zu hoch!\' Der Feuerlöscher ist aufgebraucht, der Papierstapel qualmt.',
    leftOption: {
      label: 'Feuerwehr rufen, Schaden melden',
      effects: { budget: -12, zufriedenheit: -3, personal: -4, effizienz: -8 },
    },
    rightOption: {
      label: 'Klaus selbst regeln lassen',
      effects: { budget: -5, zufriedenheit: -6, personal: -2, effizienz: -12 },
    },
  },

  // ─── CHAIN CARDS – Herr Müller Bürger ────────────────────────────────────────
  {
    id: 'b_zaun',
    category: 'buerger',
    character: 'Müller',
    title: 'Der Gartenzaun des Herrn Müller',
    situation:
      'Herr Müller, Rentner, bringt einen Bauantrag für seinen Gartenzaun. Das Formular ist unvollständig — Maßangaben fehlen. Er legt aber frisch gebackenen Pflaumenkuchen auf den Tisch.',
    leftOption: {
      label: 'Antrag ablehnen, Formular korrekt einreichen',
      effects: { budget: 0, zufriedenheit: -4, personal: 0, effizienz: 5 },
    },
    rightOption: {
      label: 'Antrag annehmen, Maßangaben nachreichen lassen',
      effects: { budget: 0, zufriedenheit: 7, personal: 1, effizienz: -3 },
      unlocksCard: 'b_carport',
    },
  },
  {
    id: 'b_carport',
    isChainCard: true,
    category: 'buerger',
    character: 'Müller',
    title: 'Der Carport des Herrn Müller',
    situation:
      'Herr Müller ist wieder da. Mit einem Carport-Antrag. Und Zwetschgendatschi. \'Da der Zaun so gut geklappt hat...\'. Der Carport wäre 30cm zu breit laut Bebauungsplan.',
    leftOption: {
      label: 'Antrag ablehnen — 30cm sind 30cm',
      effects: { budget: 0, zufriedenheit: -7, personal: 0, effizienz: 6 },
    },
    rightOption: {
      label: 'Befreiung erteilen, kleiner Formfehler',
      effects: { budget: -4, zufriedenheit: 9, personal: 0, effizienz: -5 },
    },
  },

  // ─── CHAIN CARDS – Bürgermeister ─────────────────────────────────────────────
  {
    id: 'pol_neffe',
    category: 'politik',
    character: 'Bürgermeister',
    title: 'Die Baugenehmigung des Neffen',
    situation:
      'Der Bürgermeister ruft persönlich an: \'Mein Neffe braucht dringend eine Baugenehmigung für seinen Anbau. Etwas unkompliziert bitte.\' Der Antrag ist formell korrekt, aber wurde bevorzugt eingereicht.',
    leftOption: {
      label: 'Normal einreihen, kein Vorzug',
      effects: { budget: 0, zufriedenheit: 3, personal: 2, effizienz: 5 },
      unlocksCard: 'pol_parkplatz',
    },
    rightOption: {
      label: 'Vorzug erteilen, BM zufriedenstellen',
      effects: { budget: 5, zufriedenheit: -5, personal: 0, effizienz: -6 },
    },
  },
  {
    id: 'pol_parkplatz',
    isChainCard: true,
    category: 'politik',
    character: 'Bürgermeister',
    title: 'Parkplakette unter Beschuss',
    situation:
      'Der Bürgermeister ist sauer. Seine Parkplakette — verwaltungstechnisch neu bewertet — soll nicht mehr gelten. Er fordert \'sofortige Korrektur\'. Der Jurist sagt: \'Rechtlich korrekt bewertet.\'',
    leftOption: {
      label: 'Bewertung beibehalten, Jurist hat Recht',
      effects: { budget: 0, zufriedenheit: 4, personal: 3, effizienz: 7 },
    },
    rightOption: {
      label: 'Plakette stillschweigend wiederherstellen',
      effects: { budget: 0, zufriedenheit: -8, personal: -2, effizienz: -4 },
    },
  },

  // ─── BUERGER CARDS ───────────────────────────────────────────────────────────
  {
    id: 'b_hund',
    category: 'buerger',
    title: 'Hundesteuer-Widerspruch',
    situation:
      'Herr Grabowski legt Widerspruch ein: Sein Chihuahua \'Prinzessin\' sei emotional so klein, dass die volle Hundesteuer unverhältnismäßig sei. Er beruft sich auf \'gefühlsmäßige Kleinhunde-Ausnahme\'.',
    leftOption: {
      label: 'Widerspruch abweisen',
      effects: { budget: 4, zufriedenheit: -5, personal: 0, effizienz: 4 },
    },
    rightOption: {
      label: 'Prüfung anordnen (kostet Zeit und Geld)',
      effects: { budget: -6, zufriedenheit: 2, personal: -3, effizienz: -8 },
    },
  },
  {
    id: 'b_laerm',
    category: 'buerger',
    title: 'Lärmbeschwerde der Nachbarn',
    situation:
      'Familie Storch beschwert sich über Lärm vom Nachbarn: Rasenmäher um 7:30 Uhr, Kinder, und \'komische Gerüche\'. Das Amt müsse jetzt einschreiten. Amtlich.',
    leftOption: {
      label: 'Schreiben versenden, beobachten',
      effects: { budget: -2, zufriedenheit: 3, personal: -1, effizienz: -3 },
    },
    rightOption: {
      label: 'An Ordnungsamt weiterleiten',
      effects: { budget: 0, zufriedenheit: 1, personal: 0, effizienz: 5 },
    },
  },
  {
    id: 'b_gartenhaus',
    category: 'buerger',
    title: 'Bauantrag Gartenhaus',
    situation:
      'Frau Vogel möchte ein \'kleines\' Gartenhaus bauen — Grundriss zeigt 48 Quadratmeter mit Sauna und Whirlpool. Die Baugenehmigung wäre eigentlich straightforward, aber der Nachbar hat vorsorglich protestiert.',
    leftOption: {
      label: 'Genehmigen, Antrag ist in Ordnung',
      effects: { budget: 3, zufriedenheit: 6, personal: 0, effizienz: 3 },
    },
    rightOption: {
      label: 'Nachbareinspruch prüfen, verzögern',
      effects: { budget: -2, zufriedenheit: -4, personal: -2, effizienz: -6 },
    },
  },
  {
    id: 'b_fahrradsub',
    category: 'buerger',
    title: 'Fahrrad-Förderung für die Grundschule',
    situation:
      'Die Grundschule beantragt Fördermittel für Fahrradabstellanlagen. 12.000 Euro. Die Kinder kommen tatsächlich mit dem Rad — der Bedarf ist real. Das Budget ist aber angespannt.',
    leftOption: {
      label: 'Förderung ablehnen',
      effects: { budget: 5, zufriedenheit: -8, personal: 0, effizienz: 2 },
    },
    rightOption: {
      label: 'Förderung genehmigen',
      effects: { budget: -9, zufriedenheit: 10, personal: 0, effizienz: 3 },
    },
  },
  {
    id: 'b_strassenname',
    category: 'buerger',
    title: 'Straßenumbenennungsantrag',
    situation:
      'Eine Bürgerinitiative möchte die \'Hindenburgstraße\' in \'Geschwister-Scholl-Straße\' umbenennen. 847 Unterschriften. Die Gegenseite hat 23 Unterschriften und ist lauter. Der Stadtrat hat noch keine Position.',
    leftOption: {
      label: 'Umbenennung ablehnen bis Stadtratsbeschluss',
      effects: { budget: 0, zufriedenheit: -5, personal: 0, effizienz: 4 },
    },
    rightOption: {
      label: 'Umbenennung einleiten',
      effects: { budget: -5, zufriedenheit: 7, personal: 0, effizienz: -5 },
    },
  },
  {
    id: 'b_meta_antrag',
    category: 'buerger',
    title: 'Antrag auf Formularvereinfachung',
    situation:
      'Dr. Fecht, pensionierter Jurist, stellt einen 14-seitigen Antrag auf Vereinfachung der Antragsformulare. Der Antrag selbst ist das komplizierteste Dokument, das je das Amt erreicht hat.',
    leftOption: {
      label: 'Antrag ablehnen (Bearbeitung zu aufwendig)',
      effects: { budget: 0, zufriedenheit: -3, personal: 0, effizienz: 4 },
    },
    rightOption: {
      label: 'Arbeitsgruppe einsetzen',
      effects: { budget: -7, zufriedenheit: 4, personal: -4, effizienz: -9 },
    },
  },
  {
    id: 'b_weihnachtsmarkt',
    category: 'buerger',
    title: 'Weihnachtsmarkt-Genehmigung',
    situation:
      'Der Gewerbeverein beantragt die Weihnachtsmarkt-Genehmigung für den Marktplatz. Aber die Feuerwehr meldet Bedenken wegen der Gasheizpilze, und ein Anwohner klagt vorsorglich gegen Lärm.',
    leftOption: {
      label: 'Genehmigung mit Auflagen erteilen',
      effects: { budget: 4, zufriedenheit: 8, personal: -2, effizienz: -4 },
    },
    rightOption: {
      label: 'Genehmigung verweigern bis Klärung',
      effects: { budget: 0, zufriedenheit: -10, personal: 0, effizienz: 5 },
    },
  },
  {
    id: 'b_kreisverkehr',
    category: 'buerger',
    title: 'Bürgerbegehren Kreisverkehr',
    situation:
      '1.200 Bürger wollen einen Kreisverkehr an der gefährlichen Kreuzung Hauptstraße/Bahnhofstraße. Die Straßenbauverwaltung sagt: frühestens 2029. Die Bürger sagen: sofort.',
    leftOption: {
      label: 'An übergeordnete Behörde weitergeben',
      effects: { budget: 0, zufriedenheit: -4, personal: 0, effizienz: 2 },
    },
    rightOption: {
      label: 'Beschleunigungsverfahren einleiten',
      effects: { budget: -11, zufriedenheit: 7, personal: -2, effizienz: -6 },
    },
  },
  {
    id: 'b_hundekot',
    category: 'buerger',
    title: 'Hundekotschilder-Antrag',
    situation:
      'Frau Bauer möchte mehr Warnschilder gegen Hundekot im Park. Sie bringt eine Fotomappe mit 34 Beweisfotos. Die vorhandenen 8 Schilder reichen ihr nicht. Sie fordert 30 weitere.',
    leftOption: {
      label: 'Antrag ablehnen, Schilder ausreichend',
      effects: { budget: 0, zufriedenheit: -3, personal: 0, effizienz: 3 },
    },
    rightOption: {
      label: '10 weitere Schilder genehmigen',
      effects: { budget: -4, zufriedenheit: 5, personal: 0, effizienz: -2 },
    },
  },
  {
    id: 'b_bienen',
    category: 'buerger',
    title: 'Bienenstock im Stadtgarten',
    situation:
      'Herr Imker Rosenbauer möchte drei Bienenstöcke im städtischen Garten aufstellen. Die Bienen kämen der Artenvielfalt zugute. Nachbarin Frau Kohl ist allergisch und hat Angst.',
    leftOption: {
      label: 'Bienenstock ablehnen',
      effects: { budget: 0, zufriedenheit: -5, personal: 0, effizienz: 3 },
    },
    rightOption: {
      label: 'Bienenstock genehmigen mit Sicherheitszone',
      effects: { budget: -3, zufriedenheit: 6, personal: 0, effizienz: -2 },
    },
  },
  {
    id: 'b_laubenpieper',
    category: 'buerger',
    title: 'Kleingarten-Regelverstoß',
    situation:
      'Parzelle 47: Herr Stein hat eine 2,20m hohe Thujahecke gepflanzt. Erlaubt sind 1,20m. Die Kleingartensatzung ist eindeutig. Herr Stein ist seit 30 Jahren Mitglied und bewässert auch die Nachbarparzellen.',
    leftOption: {
      label: 'Regelkonforme Rückschnittsverfügung ausstellen',
      effects: { budget: 0, zufriedenheit: -4, personal: 0, effizienz: 8 },
    },
    rightOption: {
      label: 'Kulanz walten lassen, Verwarnung',
      effects: { budget: 0, zufriedenheit: 5, personal: 1, effizienz: -3 },
    },
  },
  {
    id: 'b_formfehler',
    category: 'buerger',
    title: 'Dringlicher Antrag mit Formfehler',
    situation:
      'Der Antrag auf Gewerbeanmeldung der jungen Gründerin Tanja Koch liegt vor. Alles korrekt — außer: sie hat Unterschrift an falscher Stelle. Falsche Stelle, exakt richtige Person. Bearbeitungsfrist läuft morgen ab.',
    leftOption: {
      label: 'Formfehler abweisen, neu einreichen',
      effects: { budget: 0, zufriedenheit: -8, personal: 0, effizienz: 5 },
    },
    rightOption: {
      label: 'Formfehler intern korrigieren, genehmigen',
      effects: { budget: 0, zufriedenheit: 9, personal: 2, effizienz: -6 },
    },
  },

  // ─── PERSONAL CARDS ──────────────────────────────────────────────────────────
  {
    id: 'p_urlaub',
    category: 'personal',
    title: 'Urlaubsanträge im Sommerhoch',
    situation:
      'Sieben Mitarbeiter haben gleichzeitig die letzte Juliwoche Urlaub beantragt. Das würde die Abteilung auf 30% Kapazität bringen. Die Anträge wurden rechtzeitig eingereicht — alles formell korrekt.',
    leftOption: {
      label: 'Alle Anträge genehmigen',
      effects: { budget: 0, zufriedenheit: 8, personal: -3, effizienz: -9 },
    },
    rightOption: {
      label: 'Drei Anträge verschieben',
      effects: { budget: 0, zufriedenheit: -6, personal: 2, effizienz: 5 },
    },
  },
  {
    id: 'p_betriebsausflug',
    category: 'personal',
    title: 'Betriebsausflug-Planung',
    situation:
      'Der Betriebsrat schlägt einen Betriebsausflug ins Phantasialand vor. Budget: 4.800 Euro. Alternativ: Grillabend im Garten des Rathauses für 400 Euro. Beide Optionen haben Für und Wider.',
    leftOption: {
      label: 'Grillabend im Rathausgarten',
      effects: { budget: -2, zufriedenheit: 3, personal: 4, effizienz: -1 },
    },
    rightOption: {
      label: 'Phantasialand-Ausflug genehmigen',
      effects: { budget: -9, zufriedenheit: 7, personal: 8, effizienz: -5 },
    },
  },
  {
    id: 'p_stelle',
    category: 'personal',
    title: 'Neue Stelle ausschreiben',
    situation:
      'Die Sachbearbeiterin Frau Wenzel geht in Rente. Nachfolge-Stelle ausschreiben? Der Kämmerer rät ab: \'Knappes Budget.\' Der Personalrat besteht auf Nachbesetzung. Der Rückstand wächst.',
    leftOption: {
      label: 'Stelle nicht nachbesetzen',
      effects: { budget: 7, zufriedenheit: -4, personal: -8, effizienz: -6 },
    },
    rightOption: {
      label: 'Stelle ausschreiben',
      effects: { budget: -10, zufriedenheit: 3, personal: 9, effizienz: 5 },
    },
  },
  {
    id: 'p_ueberstunden',
    category: 'personal',
    title: 'Überstunden-Ausgleich',
    situation:
      'Das Team hat im letzten Quartal 340 Überstunden angesammelt. Auszahlen kostet 18.000 Euro. Freizeitausgleich bremst die Kapazität für 6 Wochen. Beide Optionen treffen das Amt.',
    leftOption: {
      label: 'Freizeitausgleich gewähren',
      effects: { budget: 0, zufriedenheit: 6, personal: 5, effizienz: -10 },
    },
    rightOption: {
      label: 'Überstunden auszahlen',
      effects: { budget: -13, zufriedenheit: 8, personal: 3, effizienz: 2 },
    },
  },
  {
    id: 'p_homeoffice',
    category: 'personal',
    title: 'Home-Office-Regelung',
    situation:
      'Mitarbeiterin Frau Ziegler bittet um 2 Tage Home-Office pro Woche. Die Dienstanweisung schweigt dazu. Der Betriebsrat findet es toll. Das Ordnungsamt nebenan findet es \'ein schlechtes Zeichen für die Bürger\'.',
    leftOption: {
      label: 'Home-Office ablehnen',
      effects: { budget: 0, zufriedenheit: -5, personal: -4, effizienz: 3 },
    },
    rightOption: {
      label: 'Home-Office-Pilot genehmigen',
      effects: { budget: -3, zufriedenheit: 5, personal: 6, effizienz: -4 },
    },
  },
  {
    id: 'p_weiterbildung',
    category: 'personal',
    title: 'Excel-Weiterbildung',
    situation:
      'Klaus aus der IT organisiert einen Excel-Kurs. Zweitägig. 1.200 Euro. Ziel: Das Team hört auf, Tabellen als eingescannte PDFs zu verwalten. Frau Brandt sagt: \'Excel ist Teufelswerk.\'',
    leftOption: {
      label: 'Kurs ablehnen, Zeit zu knapp',
      effects: { budget: 2, zufriedenheit: -3, personal: -1, effizienz: -2 },
    },
    rightOption: {
      label: 'Kurs genehmigen',
      effects: { budget: -5, zufriedenheit: 4, personal: 3, effizienz: 9 },
    },
  },
  {
    id: 'p_kaffee',
    category: 'personal',
    character: 'Klaus',
    title: 'Die Kaffeemaschine ist kaputt',
    situation:
      'Klaus meldet: Die Kaffeemaschine ist ausgefallen. Er kann sie reparieren — braucht dafür aber einen Dienstauftrag und Ersatzteile für 180 Euro. Alternativ: neue Maschine, 650 Euro.',
    leftOption: {
      label: 'Reparatur beauftragen',
      effects: { budget: -4, zufriedenheit: 3, personal: 2, effizienz: -3 },
    },
    rightOption: {
      label: 'Neue Maschine kaufen',
      effects: { budget: -9, zufriedenheit: 9, personal: 5, effizienz: 4 },
    },
  },
  {
    id: 'p_weihnachtsfeier',
    category: 'personal',
    title: 'Weihnachtsfeier Budget',
    situation:
      'Der Betriebsrat beantragt 2.800 Euro für die Weihnachtsfeier im Restaurant Zur Post. Letztes Jahr war das Budget 1.400 Euro und die Stimmung mies. Der Kämmerer hat Weihnachtsfeier schon gestrichen.',
    leftOption: {
      label: 'Budget ablehnen, intern feiern',
      effects: { budget: 3, zufriedenheit: -6, personal: -4, effizienz: -1 },
    },
    rightOption: {
      label: 'Budget genehmigen',
      effects: { budget: -8, zufriedenheit: 9, personal: 7, effizienz: 2 },
    },
  },
  {
    id: 'p_gleichstellung',
    category: 'personal',
    title: 'Gleichstellungsbericht fällig',
    situation:
      'Der Gleichstellungsbeauftragte legt seinen Jahresbericht vor: 78% der Führungsstellen sind männlich besetzt. Er fordert verbindliche Quoten. Der Stadtrat hat das bisher ignoriert.',
    leftOption: {
      label: 'Bericht zur Kenntnis nehmen, keine Maßnahmen',
      effects: { budget: 0, zufriedenheit: -4, personal: -2, effizienz: 2 },
    },
    rightOption: {
      label: 'Aktionsplan erarbeiten',
      effects: { budget: -5, zufriedenheit: 5, personal: 4, effizienz: -3 },
    },
  },
  {
    id: 'p_dienstrad',
    category: 'personal',
    title: 'Dienstrad-Antrag',
    situation:
      'Fünf Mitarbeiter beantragen das Dienstrad-Leasing. Pro Rad: 80 Euro monatlich Arbeitgeberzuschuss. Vorteil: Parkplatzdruck sinkt, Mitarbeiterbindung steigt. Nachteil: Kosten.',
    leftOption: {
      label: 'Dienstrad-Programm ablehnen',
      effects: { budget: 3, zufriedenheit: -5, personal: -3, effizienz: 1 },
    },
    rightOption: {
      label: 'Dienstrad-Programm starten',
      effects: { budget: -7, zufriedenheit: 6, personal: 7, effizienz: 3 },
    },
  },

  // ─── POLITIK CARDS ───────────────────────────────────────────────────────────
  {
    id: 'pol_stadtrat',
    category: 'politik',
    title: 'Anfrage der Stadtratsfraktion',
    situation:
      'Die Fraktion der Bürgerliste stellt eine Anfrage: Warum dauern Baugenehmigungen in Musterhausen durchschnittlich 11 Monate? Der Bundesdurchschnitt liegt bei 4 Monaten. Sie möchten eine schriftliche Antwort.',
    leftOption: {
      label: 'Verzögerungen verteidigen, auf Personalmangel verweisen',
      effects: { budget: 0, zufriedenheit: -3, personal: 2, effizienz: -4 },
    },
    rightOption: {
      label: 'Optimierungsplan vorlegen',
      effects: { budget: -6, zufriedenheit: 4, personal: -2, effizienz: 9 },
    },
  },
  {
    id: 'pol_presse',
    category: 'politik',
    title: 'Journalist recherchiert',
    situation:
      'Lokalredakteur Bernd Kohl fragt nach den Reisekosten der letzten Kommunalkonferenz: 8.400 Euro für 3 Tage Potsdam. Alles dienstlich, alles korrekt abgerechnet. Nur: optisch unglücklich.',
    leftOption: {
      label: 'Keine Auskunft erteilen',
      effects: { budget: 0, zufriedenheit: -7, personal: 0, effizienz: 2 },
    },
    rightOption: {
      label: 'Transparente Auskunft geben',
      effects: { budget: 0, zufriedenheit: 5, personal: 0, effizienz: 3 },
    },
  },
  {
    id: 'pol_buergerversammlung',
    category: 'politik',
    title: 'Bürgerversammlung anberaumen',
    situation:
      'Über das neue Gewerbegebiet Ost gibt es viele offene Fragen. Der BM schlägt vor: \'Machen Sie eine Bürgerversammlung, das beruhigt die Leute.\' Das kostet Personalaufwand und könnte die Kritik auch befeuern.',
    leftOption: {
      label: 'Bürgerversammlung durchführen',
      effects: { budget: -4, zufriedenheit: 6, personal: -5, effizienz: -4 },
    },
    rightOption: {
      label: 'Infoblatt versenden statt Versammlung',
      effects: { budget: -2, zufriedenheit: -3, personal: 0, effizienz: 4 },
    },
  },
  {
    id: 'pol_foerdermittel',
    category: 'politik',
    title: 'EU-Fördermittel beantragen',
    situation:
      'Ein 340-seitiger EU-Förderantrag für \'Digitale Verwaltung 2025\' liegt auf dem Tisch. Fördersumme: 280.000 Euro. Eigenanteil: 20%. Bearbeitungszeit für den Antrag: 3 Monate Vollzeit.',
    leftOption: {
      label: 'Förderantrag ablehnen, zu aufwendig',
      effects: { budget: 0, zufriedenheit: -2, personal: 2, effizienz: 3 },
    },
    rightOption: {
      label: 'Förderantrag stellen',
      effects: { budget: -15, zufriedenheit: 3, personal: -8, effizienz: -6 },
    },
  },
  {
    id: 'pol_kooperation',
    category: 'politik',
    title: 'Kooperationsvertrag mit Nachbargemeinde',
    situation:
      'Gemeinde Kleindorf schlägt gemeinsame Bauverwaltung vor. Musterhausen würde die Führung übernehmen. Vorteil: Synergien, mehr Personal. Nachteil: Verantwortung, Komplexität, und Kleindorf zahlt zu wenig.',
    leftOption: {
      label: 'Kooperation ablehnen',
      effects: { budget: 3, zufriedenheit: 0, personal: -2, effizienz: 3 },
    },
    rightOption: {
      label: 'Kooperation eingehen',
      effects: { budget: 5, zufriedenheit: 4, personal: 6, effizienz: -7 },
    },
  },
  {
    id: 'pol_repraesentation',
    category: 'politik',
    character: 'Bürgermeister',
    title: 'Repräsentationskosten des Bürgermeisters',
    situation:
      'Der BM reicht Repräsentationskosten ein: 1.200 Euro Bewirtungskosten für \'Partnerschaftstreffen\' in Bordeaux. Der Kämmerer runzelt die Stirn. Die Belege sind lückenhaft.',
    leftOption: {
      label: 'Kosten ablehnen, Belege nachfordern',
      effects: { budget: 4, zufriedenheit: -5, personal: 0, effizienz: 4 },
    },
    rightOption: {
      label: 'Kosten anerkennen, BM zufrieden',
      effects: { budget: -8, zufriedenheit: 3, personal: 0, effizienz: -3 },
    },
  },
  {
    id: 'pol_digitalbeauftragter',
    category: 'politik',
    title: 'Der Digitalisierungsbeauftragte schreibt',
    situation:
      'Ein Brief vom Bundesbeauftragten für Digitalisierung: Musterhausen soll Pilotkommune für \'Online-Anträge 2.0\' werden. Das bedeutet 6 Monate intensive Arbeit — und bundesweite Aufmerksamkeit.',
    leftOption: {
      label: 'Ablehnen, zu viel Aufwand',
      effects: { budget: 2, zufriedenheit: -4, personal: 3, effizienz: 2 },
    },
    rightOption: {
      label: 'Pilotkommune werden',
      effects: { budget: -8, zufriedenheit: 5, personal: -6, effizienz: 11 },
    },
  },
  {
    id: 'pol_wahlen',
    category: 'politik',
    title: 'Kandidatenliste zur Kommunalwahl',
    situation:
      'Frau Brandt möchte auf der Kandidatenliste für die Kommunalwahl kandidieren — als Mitarbeiterin des Amts. Das ist grundsätzlich erlaubt, könnte aber zu Interessenkonflikten führen. Der BM ist dagegen.',
    leftOption: {
      label: 'Kandidatur offiziell nicht empfehlen',
      effects: { budget: 0, zufriedenheit: -5, personal: -4, effizienz: 2 },
    },
    rightOption: {
      label: 'Kandidatur unterstützen und beurlauben',
      effects: { budget: -4, zufriedenheit: 6, personal: -3, effizienz: -2 },
    },
  },

  // ─── KRISEN CARDS ────────────────────────────────────────────────────────────
  {
    id: 'k_wasser',
    category: 'krisen',
    title: 'Wasserrohrbruch im Keller',
    situation:
      'Der Hausmeister ruft: Wasserrohrbruch im Archivkeller. 40 Jahre Akten stehen unter Wasser. Der Notdienst kostet 3.500 Euro sofort. Ohne Eingriff: Schimmel an historischen Dokumenten.',
    leftOption: {
      label: 'Notdienst beauftragen, sofort',
      effects: { budget: -12, zufriedenheit: 3, personal: -2, effizienz: -5 },
    },
    rightOption: {
      label: 'Warten auf günstigeres Angebot',
      effects: { budget: -4, zufriedenheit: -5, personal: -2, effizienz: -13 },
    },
  },
  {
    id: 'k_server',
    category: 'krisen',
    character: 'Klaus',
    title: 'Serverausfall — alle Daten weg?',
    situation:
      'Klaus ruft um 9:03 Uhr an: \'Der Server ist abgestürzt. Backup... war letzte Woche.\' Alle digitalen Akten der letzten 7 Tage könnten weg sein. IT-Notdienst: 8.000 Euro.',
    leftOption: {
      label: 'IT-Notdienst beauftragen',
      effects: { budget: -14, zufriedenheit: 2, personal: -3, effizienz: -4 },
    },
    rightOption: {
      label: 'Klaus selbst retten lassen',
      effects: { budget: -3, zufriedenheit: -6, personal: -4, effizienz: -12 },
    },
  },
  {
    id: 'k_brand',
    category: 'krisen',
    title: 'Brandalarm im Rathaus',
    situation:
      'Der Feuermelder löst aus. 47 Mitarbeiter stehen im Parkplatz. Die Feuerwehr kommt in 6 Minuten. Klaus tippt bereits: \'War wahrscheinlich der Toaster aus Zimmer 12.\' Der Verdacht ist berechtigt.',
    leftOption: {
      label: 'Alle evakuiert lassen bis Entwarnung',
      effects: { budget: -3, zufriedenheit: 2, personal: -4, effizienz: -7 },
    },
    rightOption: {
      label: 'Selbst nachsehen, Toaster-Verdacht prüfen',
      effects: { budget: 0, zufriedenheit: -2, personal: 0, effizienz: 2 },
    },
  },
  {
    id: 'k_inspektion',
    category: 'krisen',
    title: 'Überraschungsinspektion',
    situation:
      'Um 10:15 Uhr stehen drei Herren vom Landesprüfungsamt vor der Tür. Keine Vorankündigung. Sie wollen alle Vergabeakten der letzten 3 Jahre sehen. Klaus flüstert: \'Archiv ist gerade... unaufgeräumt.\'',
    leftOption: {
      label: 'Akten öffnen, trotz Unordnung',
      effects: { budget: 0, zufriedenheit: -3, personal: -4, effizienz: -8 },
    },
    rightOption: {
      label: 'Um Terminverschiebung bitten (1 Woche)',
      effects: { budget: 0, zufriedenheit: -5, personal: 2, effizienz: 6 },
    },
  },
  {
    id: 'k_journalist',
    category: 'krisen',
    title: 'Investigativjournalist am Apparat',
    situation:
      'Sandra Weiss vom ARD-Magazin recherchiert zu \'Vetternwirtschaft in Kleinstädten\'. Sie fragt gezielt nach Auftragsvergaben der letzten 2 Jahre. Musterhausen hatte zwei kritische Vergaben.',
    leftOption: {
      label: 'Kein Kommentar, Anwalt einschalten',
      effects: { budget: -6, zufriedenheit: -8, personal: 0, effizienz: 2 },
    },
    rightOption: {
      label: 'Transparent antworten, Dokumentation offenlegen',
      effects: { budget: -2, zufriedenheit: 5, personal: 0, effizienz: 4 },
    },
  },
  {
    id: 'k_grippe',
    category: 'krisen',
    title: 'Grippewelle trifft das Amt',
    situation:
      '42% der Belegschaft ist krank gemeldet. Bürgerbüro hat 4-Stunden-Warteschlangen. Die Kranken sind krank. Überstunden für die Gesunden wären möglich — aber die klagen schon über Erschöpfung.',
    leftOption: {
      label: 'Überstunden anordnen',
      effects: { budget: -5, zufriedenheit: -4, personal: -6, effizienz: -3 },
    },
    rightOption: {
      label: 'Betrieb reduzieren, Prioritäten setzen',
      effects: { budget: 0, zufriedenheit: -7, personal: 3, effizienz: -8 },
    },
  },
  {
    id: 'k_starkregen',
    category: 'krisen',
    title: 'Starkregen beschädigt Rathausdach',
    situation:
      'Starkregenereignis letzte Nacht: Zwei Büros sind nicht nutzbar. Schaden: ca. 45.000 Euro. Die Gebäudeversicherung kommt — aber erst in 3 Wochen. Provisorium sofort: 8.000 Euro.',
    leftOption: {
      label: 'Provisorium sofort beauftragen',
      effects: { budget: -11, zufriedenheit: 3, personal: 2, effizienz: -4 },
    },
    rightOption: {
      label: 'Auf Versicherung warten, Büros sperren',
      effects: { budget: 0, zufriedenheit: -5, personal: -5, effizienz: -8 },
    },
  },
  {
    id: 'k_datenschutz',
    category: 'krisen',
    title: 'DSGVO-Datenpanne',
    situation:
      'Frau Brandt hat versehentlich 240 Bürger-E-Mails in CC statt BCC verschickt. Alle 240 sehen jetzt alle anderen Adressen. Der Datenschutzbeauftragte des Landes muss informiert werden. Oder?',
    leftOption: {
      label: 'Datenpanne melden (Pflicht)',
      effects: { budget: -5, zufriedenheit: -3, personal: -4, effizienz: -3 },
    },
    rightOption: {
      label: 'Intern bereinigen, nicht melden',
      effects: { budget: 0, zufriedenheit: 2, personal: 0, effizienz: 2 },
    },
  },
  {
    id: 'k_streik',
    category: 'krisen',
    title: 'Warnstreik öffentlicher Dienst',
    situation:
      'Ver.di ruft zum eintägigen Warnstreik auf. 60% der Belegschaft streikt. Das Bürgerbüro bleibt geschlossen. Der BM will, dass Sie streikende Mitarbeiter \'freundlich erinnern\', dass man erreichbar sein müsste.',
    leftOption: {
      label: 'BM\'s Wunsch nachkommen, ansprechen',
      effects: { budget: 0, zufriedenheit: -8, personal: -9, effizienz: -2 },
    },
    rightOption: {
      label: 'Streikrecht respektieren, nicht eingreifen',
      effects: { budget: 0, zufriedenheit: 3, personal: 7, effizienz: -5 },
    },
  },
  {
    id: 'k_it_ransomware',
    category: 'krisen',
    character: 'Klaus',
    title: 'Alle klicken auf die Phishing-Mail',
    situation:
      'Klaus bricht in Schweiß aus: 17 Mitarbeiter haben auf \'Dringende Aktualisierung — klicken Sie jetzt!\' geklickt. Trojaner möglicherweise aktiv. Klaus empfiehlt: \'Alles sofort abschalten.\'',
    leftOption: {
      label: 'Alle Systeme sofort abschalten',
      effects: { budget: -8, zufriedenheit: -5, personal: -3, effizienz: -14 },
    },
    rightOption: {
      label: 'Nur betroffene Rechner isolieren',
      effects: { budget: -5, zufriedenheit: -2, personal: -2, effizienz: -7 },
    },
  },

  // ─── ABSURDITAETEN CARDS ─────────────────────────────────────────────────────
  {
    id: 'a_stempel',
    category: 'absurditaeten',
    title: 'Neue Amtsstempel bestellen',
    situation:
      'Die Stempel sind abgenutzt. Angebot A: 3 Standard-Stempel, 180 Euro, 3 Wochen Lieferzeit. Angebot B: 12 Premium-Stempel mit Holzgriff und Echtleder-Etui, 1.200 Euro, \'sofort\'. Welche Option repräsentiert das Amt?',
    leftOption: {
      label: 'Standard-Stempel, pragmatisch',
      effects: { budget: -2, zufriedenheit: 0, personal: 1, effizienz: 3 },
    },
    rightOption: {
      label: 'Premium-Stempel, standesgemäß',
      effects: { budget: -9, zufriedenheit: 5, personal: 3, effizienz: 2 },
    },
  },
  {
    id: 'a_amtsschimmel',
    category: 'absurditaeten',
    title: 'Amtsschimmel als Maskottchen',
    situation:
      'Der Jugendstadtrat schlägt vor: Musterhausen braucht ein Maskottchen. Ein Kind hat \'Amtsschimmel Heinz\' gezeichnet — ein weißes Pferd mit Aktenstapel. Die Idee ist viral gegangen. 340 Facebook-Likes.',
    leftOption: {
      label: 'Maskottchen ablehnen, zu albern',
      effects: { budget: 0, zufriedenheit: -4, personal: -2, effizienz: 1 },
    },
    rightOption: {
      label: 'Heinz offiziell adoptieren',
      effects: { budget: -3, zufriedenheit: 10, personal: 4, effizienz: -2 },
    },
  },
  {
    id: 'a_klimaanlage',
    category: 'absurditaeten',
    title: 'Klimaanlagen-Bürgerkrieg',
    situation:
      'Büro 3 will 22°C, Büro 4 will 18°C. Die Klimaanlage hat eine Fernbedienung. Sie verschwindet täglich. Heute wurde sie im Gefrierfach gefunden. Frau Lehmann und Herr Vogel sprechen seit 3 Wochen nicht mehr.',
    leftOption: {
      label: 'Temperaturregelung per Dienstanweisung auf 20°C festlegen',
      effects: { budget: 0, zufriedenheit: -3, personal: -3, effizienz: 4 },
    },
    rightOption: {
      label: 'Mediationsgespräch ansetzen',
      effects: { budget: -3, zufriedenheit: 2, personal: 5, effizienz: -4 },
    },
  },
  {
    id: 'a_pflanzen',
    category: 'absurditaeten',
    title: 'Büropflanzen-Chaos',
    situation:
      'Die Büropflanzen sterben. Keiner gießt. Alle sagen, die anderen gießen. Lösung A: Bewässerungsplan mit Verantwortlichen. Lösung B: Kunstpflanzen kaufen. Lösung C: Gärtner beauftragen.',
    leftOption: {
      label: 'Bewässerungsplan erstellen',
      effects: { budget: 0, zufriedenheit: 1, personal: -2, effizienz: -3 },
    },
    rightOption: {
      label: 'Kunstpflanzen kaufen, Problem gelöst',
      effects: { budget: -3, zufriedenheit: 2, personal: 2, effizienz: 5 },
    },
  },
  {
    id: 'a_passwort',
    category: 'absurditaeten',
    character: 'Klaus',
    title: 'Passwort-Reset-Tag',
    situation:
      'Alle 47 Mitarbeiter müssen heute ihr Passwort erneuern. Klaus hat die neue IT-Richtlinie implementiert: Mindestlänge 14 Zeichen, Sonderzeichen, keine Wiederholung der letzten 12 Passwörter. Es herrscht Chaos.',
    leftOption: {
      label: 'Klaus zurückpfeifen, einfachere Regeln',
      effects: { budget: 0, zufriedenheit: 4, personal: 3, effizienz: -3 },
    },
    rightOption: {
      label: 'Richtlinie durchsetzen, Sicherheit geht vor',
      effects: { budget: 0, zufriedenheit: -5, personal: -4, effizienz: -8 },
    },
  },
  {
    id: 'a_reform',
    category: 'absurditaeten',
    title: '47-seitiger Verwaltungsreform-Fragebogen',
    situation:
      'Das Innenministerium schickt einen Fragebogen zur \'Verwaltungsmodernisierung 2025\'. 47 Seiten, 312 Fragen. Ausfüllzeit laut Ministerium: \'2-3 Stunden\'. Klaus schätzt: 3 Wochen. Abgabefrist: nächster Freitag.',
    leftOption: {
      label: 'Fragebogen minimal ausfüllen, abgeben',
      effects: { budget: 0, zufriedenheit: 0, personal: -3, effizienz: -6 },
    },
    rightOption: {
      label: 'Gründlich ausfüllen, Überstunden machen',
      effects: { budget: -4, zufriedenheit: 2, personal: -7, effizienz: 5 },
    },
  },
  {
    id: 'a_bester_behoerde',
    category: 'absurditaeten',
    title: 'Wettbewerb Schönste Behörde Deutschland',
    situation:
      'Musterhausen ist nominiert für \'Freundlichste Behörde Deutschlands 2025\'. Voraussetzung: ein Jury-Besuch, neue Wartezimmer-Stühle (2.400 Euro), und alle Mitarbeiter müssen lächeln.',
    leftOption: {
      label: 'Bewerbung zurückziehen',
      effects: { budget: 2, zufriedenheit: -2, personal: 2, effizienz: 3 },
    },
    rightOption: {
      label: 'Vollgas für den Titel',
      effects: { budget: -8, zufriedenheit: 9, personal: -4, effizienz: -5 },
    },
  },
  {
    id: 'a_aktenvernichter',
    category: 'absurditaeten',
    title: 'Aktenvernichter-Beschaffung',
    situation:
      'Der alte Aktenvernichter hat seinen Geist aufgegeben — mitten in der Datenschutzvernichtung. Angebot A: günstiger Ersatz, Sicherheitsstufe P-4, 340 Euro. Angebot B: Hochsicherheitsvernichter P-7, 2.800 Euro.',
    leftOption: {
      label: 'P-4 reicht für kommunale Daten',
      effects: { budget: -3, zufriedenheit: 0, personal: 1, effizienz: 3 },
    },
    rightOption: {
      label: 'P-7, Sicherheit hat keinen Preis',
      effects: { budget: -10, zufriedenheit: 2, personal: 0, effizienz: 2 },
    },
  },
  {
    id: 'a_jubilaeum',
    category: 'absurditaeten',
    title: '125 Jahre Amt Musterhausen',
    situation:
      'Das Amt feiert Jubiläum. Geplant: Festakt, Chronik, Ausstellung, Empfang. Budget-Schätzung: 22.000 Euro. Oder: Kleiner Kaffeeklatsch mit Belegschaft, 800 Euro. Der BM will Reden halten.',
    leftOption: {
      label: 'Kleinen Kaffeeklatsch',
      effects: { budget: -2, zufriedenheit: 3, personal: 5, effizienz: 1 },
    },
    rightOption: {
      label: 'Großes Festprogramm',
      effects: { budget: -15, zufriedenheit: 11, personal: 6, effizienz: -6 },
    },
  },
  {
    id: 'a_ki_einsatz',
    category: 'absurditaeten',
    title: 'KI-Pilot-Projekt des Bundesministeriums',
    situation:
      'Das Bundesinnenministerium bietet an: KI-System zur automatischen Vorbescheidung einfacher Anträge. Testlaufzeit 6 Monate, kostenlos. Klaus ist begeistert. Frau Brandt: \'Ein Computer macht nicht meinen Job.\'',
    leftOption: {
      label: 'Pilot ablehnen, Mitarbeiter kommen zuerst',
      effects: { budget: 2, zufriedenheit: 4, personal: 6, effizienz: -4 },
    },
    rightOption: {
      label: 'Pilot starten, Zukunft gestalten',
      effects: { budget: 4, zufriedenheit: -3, personal: -5, effizienz: 12 },
    },
  },

  // ─── ADDITIONAL CARDS (59 & 60) ──────────────────────────────────────────────
  {
    id: 'b_baulm',
    category: 'buerger',
    title: 'Baumfällung im Privatgarten',
    situation:
      'Familie Kern möchte eine 80-jährige Linde fällen — Wurzeln im Abwasserrohr. Baumschutzsatzung greift. Alternativ: teures Wurzelmanagement. Die Linde ist schön, aber das Rohr ist defekt.',
    leftOption: {
      label: 'Fällgenehmigung erteilen',
      effects: { budget: 3, zufriedenheit: 4, personal: 0, effizienz: 5 },
    },
    rightOption: {
      label: 'Fällung ablehnen, Alternativlösung fordern',
      effects: { budget: -5, zufriedenheit: -3, personal: 0, effizienz: -4 },
    },
  },
  {
    id: 'k_hitze',
    category: 'krisen',
    title: 'Hitzewelle — Klimatisierung versagt',
    situation:
      '38 Grad. Die einzige Klimaanlage im Gebäude läuft im Büro des Bürgermeisters. 43 Mitarbeiter schwitzen in Büros ohne Kühlung. Erste Meldungen über Kreislaufprobleme. Der Arbeitsschutz hat klare Regeln.',
    leftOption: {
      label: 'BM bitten, Klimaanlage zu teilen',
      effects: { budget: 0, zufriedenheit: 4, personal: 6, effizienz: -4 },
    },
    rightOption: {
      label: 'Mobile Klimageräte sofort beschaffen',
      effects: { budget: -10, zufriedenheit: 7, personal: 5, effizienz: 3 },
    },
  },
];
