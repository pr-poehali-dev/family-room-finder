import { useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const ROOMS = [
  {
    id: 1,
    name: "Single",
    desc: "Просторный номер на 4 персоны с двумя спальными зонами и детским уголком.",
    price: 6000,
    size: 52,
    guests: 4,
    tags: ["family", "crib", "play"],
    image: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/8f495990-0047-449e-9832-96f93c5a0bc1.png",
    badge: "Хит",
    badgeColor: "bg-hotel-orange",
  },
  {
    id: 2,
    name: "Double",
    desc: "Уютный номер с детской кроваткой и безопасным интерьером для малышей.",
    price: 8000,
    size: 28,
    guests: 3,
    tags: ["family", "crib"],
    image: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/c74abe17-b1e8-49ac-98e9-a3fa3a22bb0d.png",
    badge: "Популярный",
    badgeColor: "bg-hotel-green",
  },
  {
    id: 3,
    name: "Suite",
    desc: "Номер рядом с детской игровой комнатой. Идеально для активных детей.",
    price: 14000,
    size: 34,
    guests: 4,
    tags: ["family", "play"],
    image: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/7ad46086-027b-4b39-94f1-a61336ec7962.png",
    badge: "Новинка",
    badgeColor: "bg-hotel-yellow text-hotel-dark",
  },
];

const GALLERY = [
  { id: 1, src: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/8f495990-0047-449e-9832-96f93c5a0bc1.png", label: "Семейный люкс" },
  { id: 2, src: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/c74abe17-b1e8-49ac-98e9-a3fa3a22bb0d.png", label: "Стандарт детский" },
  { id: 3, src: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/7ad46086-027b-4b39-94f1-a61336ec7962.png", label: "Номер с гостиной" },
  { id: 4, src: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/b024e102-0421-46f3-ab06-340eca743bda.png", label: "Люкс с балконом" },
  { id: 5, src: "https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/167e5338-2cb2-4e47-8108-92fbddcb9e12.png", label: "Эко-номер" },
];

const SERVICES = [
  { icon: "Baby", title: "Детские кроватки", desc: "Бесплатно в каждом семейном номере" },
  { icon: "Gamepad2", title: "Игровая комната", desc: "Открыта с 8:00 до 22:00 для детей всех возрастов" },
  { icon: "Utensils", title: "Детское меню", desc: "Специальные блюда от шеф-повара для малышей" },
  { icon: "ShieldCheck", title: "Безопасная среда", desc: "Всё оборудование сертифицировано и безопасно" },
  { icon: "Wifi", title: "Wi-Fi для всех", desc: "Высокоскоростной интернет во всех зонах отеля" },
  { icon: "Car", title: "Парковка", desc: "Охраняемая парковка для гостей бесплатно" },
];

const FILTERS = [
  { key: "all", label: "Все номера", icon: "LayoutGrid" },
  { key: "family", label: "Для семьи", icon: "Users" },
  { key: "crib", label: "Детская кроватка", icon: "Baby" },
  { key: "play", label: "Рядом с игровой", icon: "Gamepad2" },
];

const NAV_ITEMS = ["Главная", "Номера", "Бронирование", "Галерея", "Услуги", "Контакты"];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("Главная");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<null | number>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", checkin: "", checkout: "", guests: "2", room: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<null | typeof ROOMS[0]>(null);

  const filteredRooms = activeFilter === "all"
    ? ROOMS
    : ROOMS.filter(r => r.tags.includes(activeFilter));

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const map: Record<string, string> = {
      "Главная": "hero",
      "Номера": "rooms",
      "Бронирование": "booking",
      "Галерея": "gallery",
      "Услуги": "services",
      "Контакты": "contacts",
    };
    const el = document.getElementById(map[section] || section);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = (room: typeof ROOMS[0]) => {
    setSelectedRoom(room);
    setBookingForm(f => ({ ...f, room: room.name }));
    scrollTo("Бронирование");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-hotel-cream font-golos overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">С</span>
            </div>
            <span className="font-cormorant font-semibold text-xl text-hotel-dark">Уютный Уголок</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item
                    ? "bg-hotel-orange text-white shadow-sm"
                    : "text-hotel-dark hover:bg-hotel-orange/10 hover:text-hotel-orange"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+78001234567" className="flex items-center gap-1.5 text-sm text-hotel-dark font-medium hover:text-hotel-orange transition-colors">
              <Icon name="Phone" size={14} />
              8 800 123-45-67
            </a>
            <button
              onClick={() => scrollTo("Бронирование")}
              className="px-4 py-2 bg-hotel-orange text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Забронировать
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-hotel-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/30 px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-hotel-dark hover:bg-hotel-orange/10 hover:text-hotel-orange transition-colors"
              >
                {item}
              </button>
            ))}
            <a href="tel:+78001234567" className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-hotel-dark">
              <Icon name="Phone" size={14} /> 8 800 123-45-67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 noise-bg" />

        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-hotel-yellow/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-hotel-yellow rounded-full animate-pulse" />
              Семейный отдых нового уровня
            </div>

            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-6 animate-fade-in-up delay-100">
              Отель,<br />
              где <em>счастливы</em><br />
              и дети, и родители
            </h1>

            <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up delay-200">
              Специальные номера для семей, детские кроватки, игровые зоны и всё необходимое для незабываемого отдыха с детьми.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up delay-300">
              {[
                { icon: "Baby", text: "Детские кроватки" },
                { icon: "Gamepad2", text: "Игровые зоны" },
                { icon: "Users", text: "Семейные номера" },
              ].map(chip => (
                <div key={chip.text} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                  <Icon name={chip.icon as IconName} size={14} />
                  {chip.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <button
                onClick={() => scrollTo("Бронирование")}
                className="px-8 py-4 bg-white text-hotel-orange font-bold text-base rounded-2xl hover:bg-hotel-yellow transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 animate-pulse-ring"
              >
                Забронировать номер
              </button>
              <button
                onClick={() => scrollTo("Номера")}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold text-base rounded-2xl hover:bg-white/30 transition-all border border-white/30"
              >
                Смотреть номера
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative animate-fade-in-up delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/167e5338-2cb2-4e47-8108-92fbddcb9e12.png"
                alt="Семейный номер"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 gradient-card" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-cormorant text-xl font-semibold text-hotel-dark">Single</div>
                      <div className="text-sm text-muted-foreground">2 гостя · 52 м²</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-hotel-orange text-xl">6 000 ₽</div>
                      <div className="text-xs text-muted-foreground">за ночь</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-hotel-green text-white px-4 py-2 rounded-2xl shadow-lg text-sm font-semibold animate-float">
              🏆 Рейтинг 4.9
            </div>
            <div className="absolute -bottom-4 -left-4 bg-hotel-yellow text-hotel-dark px-4 py-2 rounded-2xl shadow-lg text-sm font-semibold">
              🎉 Свободны 3 номера
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-hotel-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "150+", label: "Счастливых семей" },
            { num: "4.9★", label: "Средний рейтинг" },
            { num: "12", label: "Семейных номеров" },
            { num: "24/7", label: "Поддержка гостей" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-cormorant text-3xl font-bold text-hotel-yellow">{stat.num}</div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-hotel-orange text-sm font-semibold tracking-wider uppercase mb-3">
            <div className="w-8 h-0.5 bg-hotel-orange" /> Номера <div className="w-8 h-0.5 bg-hotel-orange" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-hotel-dark mb-4">
            Найдите идеальный номер
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Используйте фильтры, чтобы подобрать номер именно под ваши потребности
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-hotel-orange text-white shadow-lg scale-105"
                  : "bg-white text-hotel-dark border border-border hover:border-hotel-orange hover:text-hotel-orange"
              }`}
            >
              <Icon name={f.icon as IconName} size={15} />
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, i) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover-lift border border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative">
                <img src={room.image} alt={room.name} className="w-full h-52 object-cover" />
                <div className="absolute inset-0 gradient-card" />
                <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full ${room.badgeColor}`}>
                  {room.badge}
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {room.tags.includes("crib") && (
                    <span className="glass text-hotel-dark text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Icon name="Baby" size={11} /> Кроватка
                    </span>
                  )}
                  {room.tags.includes("play") && (
                    <span className="glass text-hotel-dark text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Icon name="Gamepad2" size={11} /> Игровая
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-cormorant text-xl font-semibold text-hotel-dark">{room.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Icon name="Star" size={13} />
                    <span className="text-hotel-dark font-medium">4.9</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{room.desc}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Icon name="Users" size={13} /> {room.guests} гостя</span>
                  <span className="flex items-center gap-1"><Icon name="Maximize2" size={13} /> {room.size} м²</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-hotel-orange">{room.price.toLocaleString()} ₽</span>
                    <span className="text-muted-foreground text-sm"> / ночь</span>
                  </div>
                  <button
                    onClick={() => handleBook(room)}
                    className="px-5 py-2.5 bg-hotel-orange text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 bg-hotel-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-hotel-orange rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-hotel-yellow rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-hotel-yellow text-sm font-semibold tracking-wider uppercase mb-3">
              <div className="w-8 h-0.5 bg-hotel-yellow" /> Бронирование <div className="w-8 h-0.5 bg-hotel-yellow" />
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-white mb-4">
              Забронируйте номер онлайн
            </h2>
            <p className="text-white/60">
              Заполните форму и мы свяжемся с вами в течение 15 минут
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-hotel-green/20 border border-hotel-green/40 rounded-3xl p-12 text-center animate-scale-in">
              <div className="w-16 h-16 bg-hotel-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-white" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">Заявка принята!</h3>
              <p className="text-white/70 mb-6">Мы свяжемся с вами по номеру телефона в течение 15 минут</p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="px-6 py-3 bg-hotel-orange text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors"
              >
                Новая заявка
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 grid md:grid-cols-2 gap-5">
              {selectedRoom && (
                <div className="md:col-span-2">
                  <div className="bg-hotel-orange/10 border border-hotel-orange/30 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <Icon name="BedDouble" size={18} className="text-hotel-orange flex-shrink-0" />
                    <span className="text-hotel-dark text-sm font-medium">Выбранный номер: <b>{selectedRoom.name}</b> — {selectedRoom.price.toLocaleString()} ₽/ночь</span>
                    <button type="button" onClick={() => setSelectedRoom(null)} className="ml-auto text-muted-foreground hover:text-hotel-dark">
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван Петров"
                  value={bookingForm.name}
                  onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 900 000-00-00"
                  value={bookingForm.phone}
                  onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Дата заезда</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkin}
                  onChange={e => setBookingForm(f => ({ ...f, checkin: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Дата выезда</label>
                <input
                  type="date"
                  required
                  value={bookingForm.checkout}
                  onChange={e => setBookingForm(f => ({ ...f, checkout: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Количество гостей</label>
                <select
                  value={bookingForm.guests}
                  onChange={e => setBookingForm(f => ({ ...f, guests: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hotel-dark">Тип номера</label>
                <select
                  value={bookingForm.room}
                  onChange={e => setBookingForm(f => ({ ...f, room: e.target.value }))}
                  className="px-4 py-3 rounded-xl border border-border bg-white/80 text-hotel-dark focus:outline-none focus:ring-2 focus:ring-hotel-orange transition-all"
                >
                  <option value="">Любой семейный</option>
                  {ROOMS.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-hotel-orange text-white font-bold text-base rounded-2xl hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Отправить заявку на бронирование
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-hotel-orange text-sm font-semibold tracking-wider uppercase mb-3">
            <div className="w-8 h-0.5 bg-hotel-orange" /> Галерея <div className="w-8 h-0.5 bg-hotel-orange" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-hotel-dark mb-4">
            Реальные фото номеров
          </h2>
          <p className="text-muted-foreground">Никакого фотошопа — только честные фотографии наших пространств</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.map((item, i) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover-lift ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 4 ? "col-span-2 md:col-span-2" : ""}`}
              onClick={() => setGalleryOpen(i)}
            >
              <img
                src={item.src}
                alt={item.label}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-72 md:h-full" : i === 4 ? "h-48" : "h-40 md:h-44"}`}
              />
              <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="glass text-hotel-dark text-xs font-medium px-3 py-1.5 rounded-full">
                  {item.label}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
                  <Icon name="ZoomIn" size={14} className="text-hotel-orange" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY LIGHTBOX */}
      {galleryOpen !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setGalleryOpen(null)}
        >
          <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <Icon name="X" size={20} />
          </button>
          <img
            src={GALLERY[galleryOpen].src}
            alt={GALLERY[galleryOpen].label}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-hotel-dark text-sm font-medium">
            {GALLERY[galleryOpen].label}
          </div>
        </div>
      )}

      {/* SERVICES */}
      <section id="services" className="py-20 bg-gradient-to-br from-hotel-orange/5 via-hotel-cream to-hotel-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-hotel-orange text-sm font-semibold tracking-wider uppercase mb-3">
              <div className="w-8 h-0.5 bg-hotel-orange" /> Услуги <div className="w-8 h-0.5 bg-hotel-orange" />
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-hotel-dark mb-4">
              Всё для комфорта семьи
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover-lift border border-border/50 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 gradient-hero rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Icon name={service.icon as IconName} size={22} className="text-white" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-hotel-dark mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-hotel-orange text-sm font-semibold tracking-wider uppercase mb-3">
            <div className="w-8 h-0.5 bg-hotel-orange" /> Контакты <div className="w-8 h-0.5 bg-hotel-orange" />
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-hotel-dark mb-4">
            Свяжитесь с нами
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[
              { icon: "MapPin", title: "Адрес", value: "г. Кемерово", sub: "Ждём вас!" },
              { icon: "Phone", title: "Телефон", value: "8 800 123-45-67", sub: "Звонок бесплатный, с 8:00 до 22:00" },
              { icon: "Mail", title: "Email", value: "hotelygolok@mail.ru", sub: "Ответим в течение 2 часов" },
              { icon: "Clock", title: "Заезд / Выезд", value: "Check-in с 14:00", sub: "Check-out до 12:00" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-border/50">
                <div className="w-10 h-10 bg-hotel-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as IconName} size={18} className="text-hotel-orange" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{item.title}</div>
                  <div className="font-semibold text-hotel-dark">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-hotel-dark rounded-3xl overflow-hidden relative min-h-64">
            <img
              src="https://cdn.poehali.dev/projects/b43ca84d-8418-4137-874a-603e55f5fe3f/bucket/64350cfc-e820-4a3a-942a-847f6781bf7a.png"
              alt="Отель Уютный Уголок"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
              <div className="w-14 h-14 bg-hotel-orange rounded-full flex items-center justify-center mb-4 animate-pulse-ring shadow-xl">
                <Icon name="MapPin" size={26} />
              </div>
              <p className="font-cormorant text-2xl font-semibold mb-2">Мы на карте</p>
              <p className="text-white/70 text-sm mb-4">г. Кемерово</p>
              <button className="px-5 py-2.5 bg-hotel-orange text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg">
                Открыть в картах
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-hotel-dark text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold">С</span>
              </div>
              <div>
                <div className="font-cormorant text-xl font-semibold">Уютный Уголок</div>
                <div className="text-white/50 text-xs">Семейный отдых нового уровня</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { icon: "Phone", href: "tel:+78001234567" },
                { icon: "MessageCircle", href: "#" },
                { icon: "Instagram", href: "#" },
              ].map(s => (
                <a
                  key={s.icon}
                  href={s.href}
                  className="w-9 h-9 bg-white/10 hover:bg-hotel-orange rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon name={s.icon as IconName} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>© 2026 Уютный Уголок. Все права защищены.</span>
            <span>Политика конфиденциальности · Оферта</span>
          </div>
        </div>
      </footer>
    </div>
  );
}