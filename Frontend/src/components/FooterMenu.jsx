/* eslint-disable no-unused-vars */
import React from "react";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function FooterMenu() {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/product/${e.target.innerText}`);
  };
  return (
    <div className="mt-5">
      <Footer className="bg-dark">
        <div className="w-full p-4">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <img src="logo.png" width={"30px"} className="inline-block"></img>
              <h4 className="text-white inline-block ml-5">
                Dark Knight Supplements
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div className="text mt-5">
                <Footer.Title title="Links" className="text-white" />
                <Footer.LinkGroup col className="text-white">
                  <Footer.Link onClick={(e) => handleNavigate(e)}>
                    protein
                  </Footer.Link>
                  <Footer.Link onClick={(e) => handleNavigate(e)}>
                    MassGainer
                  </Footer.Link>
                  <Footer.Link onClick={(e) => handleNavigate(e)}>
                    Creatine
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="mt-5">
                <Footer.Title title="Follow us" className="text-white" />
                <Footer.LinkGroup col className="text-white">
                  <Footer.Link href="#">Facebook</Footer.Link>
                  <Footer.Link href="#">Instagram</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="mt-5">
                <Footer.Title title="Legal" className="text-white" />
                <Footer.LinkGroup col className="text-white">
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="Dark Knight Supplements™"
              year={2025}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />

              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}

export default FooterMenu;
