import "../CSS/display.css";

type Props = { Heading: String; Data: any; Type: String };

const Display = ({ Heading, Data, Type }: Props) => {
  var Description = "UwU";
  var Position = "Awooga";
  return (
    <>
      {Data.length == 0 ? (
        <div></div>
      ) : (
        <>
          <div id="titleholder">
            <h1 id="title" className="text-3xl md:text-5xl">
              {Heading}
            </h1>
          </div>
          <div className="flex px-[10%] flex-wrap pt-[5%]">
            {Data.map((item: any, key: any) => (
              <div
                className="shadow-md rounded-lg w-80 py-2 mx-10  mb-[10vh] bg-[#444444] "
                key={key}
              >
                <div v-if="Link" className=" h-full">
                  <a
                    href={
                      "https://tahsin2020.github.io/Portfolio/img/Earth.cbc5b5e6.png"
                    }
                  >
                    <img
                      src="https://tahsin2020.github.io/Portfolio/img/Earth.cbc5b5e6.png"
                      className="max-h-40 mx-auto"
                    />
                  </a>
                  <h2 className="mt-4 text-white text-center">{Position}</h2>
                  <br />
                  <h3 className="mt-4 text-slate-300 text-center mt-auto">
                    {Description}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Display;
