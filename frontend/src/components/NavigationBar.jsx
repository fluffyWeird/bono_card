// import React from "react";
// import { Account } from "lucide-react";

// export const NavigationBar = () => {
//   return (
//     <header>
//       <nav>
//         <h2>Bono Door Key</h2>
//       </nav>
//     </header>
//   );
// };
import React from "react";
import { Settings, User } from "lucide-react";
const NavigationBar = () => {
  return (
    <header>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <p className="text-lg font-bold">Bono Door Key</p>
        </div>
        <div className="flex-none">
          <User />
        </div>
      </nav>
    </header>

    //     <header>
    //   <nav className="flex items-center justify-between p-4">
    //     <p className="text-lg font-bold">Bono Door Key</p>
    //     <User />
    //   </nav>
    // </header>
  );
};

export default NavigationBar;
