import React from "react";
import { useEffect } from "react";
import "../Styles/Error.css";
import { Avatar, Button, Tooltip } from "@chakra-ui/react";

export default function Error404() {
  useEffect(() => {
    const delayQueue = [
      ".one",
      ".two",
      ".three",
      ".four",
      ".five",
      ".six",
      ".seven",
      ".eight",
      ".nine",
      ".ten",
      ".eleven",
      ".twelve",
      ".thirteen",
      ".fourteen",
      ".fifteen",
    ];

    delayQueue.forEach((selector, index) => {
      setTimeout(() => {
        const element = document.querySelector(selector);
        if (element) {
          element.classList.add("selected");
        }
      }, 500 * (index + 1));
    });
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = "lightgrey";
  }, []);

  return (
    <div id="wrap">
      <div id="wordsearch">
        <ul>
          <li>k</li>

          <li>v</li>

          <li>n</li>

          <li>z</li>

          <li>i</li>

          <li>x</li>

          <li>m</li>

          <li>e</li>

          <li>t</li>

          <li>a</li>

          <li>x</li>

          <li>l</li>

          <li class="one">4</li>

          <li class="two">0</li>

          <li class="three">4</li>

          <li>y</li>

          <li>y</li>

          <li>w</li>

          <li>v</li>

          <li>b</li>

          <li>o</li>

          <li>q</li>

          <li>d</li>

          <li>y</li>

          <li>p</li>

          <li>a</li>

          <li class="four">p</li>

          <li class="five">a</li>

          <li class="six">g</li>

          <li class="seven">e</li>

          <li>v</li>

          <li>j</li>

          <li>a</li>

          <li class="eight">n</li>

          <li class="nine">o</li>

          <li class="ten">t</li>

          <li>s</li>

          <li>c</li>

          <li>e</li>

          <li>w</li>

          <li>v</li>

          <li>x</li>

          <li>e</li>

          <li>p</li>

          <li>c</li>

          <li>f</li>

          <li>h</li>

          <li>q</li>

          <li>e</li>

          <li class="eleven">f</li>

          <li class="twelve">o</li>

          <li class="thirteen">u</li>

          <li class="fourteen">n</li>

          <li class="fifteen">d</li>

          <li>s</li>

          <li>w</li>

          <li>q</li>

          <li>v</li>

          <li>o</li>

          <li>s</li>

          <li>m</li>

          <li>v</li>

          <li>f</li>

          <li>u</li>
        </ul>
      </div>

      <div id="main-content">
        <h1>Hey there, I'am Rutuj Gopale</h1>

        <p>
          Unfortunately, the page you were looking for could not be found or
          loaded. It may be temporarily unavailable, moved, or the backend
          server might have stopped due to extended inactivity.
        </p>
        <p>
          You can click below button to view the project repository, which
          contains more details about the project:
        </p>

        <div id="navigation">
          <a href="https://github.com/Rutuj99/Socio-Meet">
            <Button w="101px">Click</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
