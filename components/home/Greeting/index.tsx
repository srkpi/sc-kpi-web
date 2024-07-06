const Greeting = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-h1">Студентська рада КПІ</h1>
        <p className="font-p">
          це ком'юніті згуртованих та ініціативних студентів, які роблять КПІ
          кращим.
        </p>
      </div>
      <div className="flex flex-col gap-1 max-w-[520px]">
        <h3 className="font-h3">Ми відкриті для кожного студента</h3>
        <p className="font-p">
          Основна наша діяльність полягає в захисті прав та інформуванні
          студентства, організації та проведення культурно-масових подій
        </p>
      </div>
      <div className="flex flex-col gap-1 max-w-[520px]">
        <h3 className="font-h3">У Студраді є місце для всіх</h3>
        <p className="font-p">
          від редакторів/ок та дизайнерів/ок до організаторів/ок подій, а також
          всіх, хто має бажання підтримувати студентську спільноту.
        </p>
      </div>
      <p className="max-w-[520px] font-p">
        <span className="font-h3">Кожен,</span> хто бажає приєднатися, може
        будь-коли заповнити форму за посиланням нижче.
      </p>
    </div>
  );
};

export default Greeting;
