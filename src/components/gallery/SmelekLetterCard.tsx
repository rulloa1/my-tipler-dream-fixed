import { FC } from "react";

export const SmelekLetterCard: FC = () => {
    return (
        <div className="w-full h-full bg-[#fdfcf8] p-8 md:p-12 shadow-inner overflow-y-auto font-['Architects_Daughter'] text-charcoal border border-cream-dark">
            <div className="max-w-2xl mx-auto space-y-6 text-sm md:text-base leading-relaxed">
                <header className="mb-8 border-b border-charcoal/10 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase">Michael E. Chandler</h2>
                    <p className="text-xs opacity-70">8215 Winding Hills Ln, Spring, Texas 77379</p>
                    <p className="text-xs opacity-70">Cellular: (435) 237-7373 | Email: mike.rccon@yahoo.com</p>
                </header>

                <p>
                    "While this is my need to showcase my work, I do not want to take anything away from the extraordinary and beautiful work done by Michael and Robert Smelek. Truly gifted, always professionals, and absolute gentlemen!
                </p>

                <p>
                    Michael and Robert designed all of the large element items on this pool, and surrounding structures, and I picked up and did all of the more finite detail work, including establishing the look and feel of the bathrooms, which were purposely patterned to have the look and design aesthetic of a 1950's NY Men's Smoking Club. While this was my initial idea, it was easily integrated into the project and plans, flawlessly by Smelek Design.
                </p>

                <p>
                    I also designed the more finite details of this project, including making final decisions for all of the furniture and fabrics, pool plaster color, swim-up bar front design and back-bar layout and design and even including a custom "blue" granite backsplash. Also included in this was the custom post and rail design for the railing, leading to the pool slides. The reason behind the meticulous design of these detail items is that with some forethought, subtle design elements make each of these items, extraordinary, and seamlessly blend with the surrounding Architecture and Landscaping, which all must be integral to the park-like setting, in which it sits.
                </p>

                <p>
                    At no time do I want to take away from the truly beautiful design work of Michael and Robert Smelek!
                </p>

                <p>
                    Thank you, both for your work!
                </p>

                <footer className="mt-12 pt-8">
                    <p className="text-lg">Michael E. Chandler</p>
                </footer>
            </div>
        </div>
    );
};
