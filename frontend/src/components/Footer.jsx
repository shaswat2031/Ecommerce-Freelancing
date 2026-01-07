import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0F3D2E] text-white">

            <div
                className="
          mx-auto max-w-7xl
          px-6 md:px-14 lg:px-24
          min-h-[48vh]
          flex flex-col justify-center
        "
            >
                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">

                    {/* LEFT */}
                    <div className="max-w-md">
                        <p className="font-body text-xl md:text-2xl leading-[1.8] tracking-wide text-white/90">
                            Elevating the global standard of
                            <br />
                            organic essentials.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="grid grid-cols-2 gap-x-24">

                        {/* SHOP */}
                        <div>
                            <h4 className="font-body text-[11px] tracking-[0.3em] uppercase mb-6 text-white/70">
                                Shop
                            </h4>
                            <ul className="space-y-4">
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Saffron</li>
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Hing</li>
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Gifting</li>
                            </ul>
                        </div>

                        {/* CONNECT */}
                        <div>
                            <h4 className="font-body text-[11px] tracking-[0.3em] uppercase mb-6 text-white/70">
                                Connect
                            </h4>
                            <ul className="space-y-4">
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Instagram</li>
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Support</li>
                                <li className="text-xs tracking-[0.22em] uppercase text-white/60">Wholesale</li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="mt-14 flex justify-center">
                    <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40">
                        © 2024 SIRABA ORGANIC.
                    </p>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
