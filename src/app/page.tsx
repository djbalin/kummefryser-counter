export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      {
        <section className="flex flex-col text-center gap-y-10">
          <p className="text-xl text-green-500">
            To view your own freezer or to create your first one, click
            &quot;Log in&quot; in the top.
          </p>
          {/* <svg width="300" height="100" className="">
              <defs>
                <marker
                  id="arrow"
                  markerWidth="13"
                  markerHeight="13"
                  refX="3"
                  refY="6"
                  orient="auto"
                >
                  <path d="M2,2 L2,11 L10,6 L2,2" className="path1" />
                </marker>
              </defs>

              <path d="M30,150 L100,50" className="path2" />
            </svg> */}
          <p className="text-lg text-purple-400">
            Click &quot;Example freezer&quot; to view an example freezer and
            play around with the application.
          </p>
        </section>
      }
    </main>
  );
}
