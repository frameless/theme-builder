class DemoPageElement extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this.render();
  }
  render() {
    this._shadow.innerHTML = `<div class="utrecht-page-layout">
        <utrecht-page-header>
          <utrecht-paragraph><slot name="page-header"></slot></utrecht-paragraph>
        </utrecht-page-header>
        <utrecht-page-body>
          <div class="column-gap-xl">
            <!-- bron: https://www.zeist.nl/ondernemen/subsidies-of-financiele-steun-ondernemers/steun-voor-ondernemers -->
            <section class="main-column column" id="main" aria-label="hoofdkolom">
              <div class="page-title">
                <utrecht-heading-1 class="page-title__header header" id="page-title"
                  >Steun voor ondernemers</utrecht-heading-1
                >
              </div>

              <div id="c11027" class="ce-textpic flow flow--outside section">
                <div class="flow flow--content">
                  <div class="ce-textpic__container flow flow--maximum-width">
                    <!--TYPO3SEARCH_begin-->

                    <div class="ce-center ce-above">
                      <div class="ce-bodytext rte-content">
                        <utrecht-paragraph lead>
                          Heeft u als ondernemer (tijdelijk) hulp nodig? Dan zijn er wellicht mogelijkheden voor
                          ondersteuning. De mogelijkheden zijn afhankelijk van uw situatie.
                        </utrecht-paragraph>
                        <utrecht-paragraph>Instanties die u kunnen helpen:</utrecht-paragraph>
                        <utrecht-html-content>
                          <ul>
                            <li>
                              Het
                              <utrecht-link href="https://www.mkbdoorgaan.nl/nl" class="link"
                                >MKB Doorgaan<span class="screenreader--only">(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true">
                                    <use href="#url"></use></svg></utrecht-icon
                              ></utrecht-link>
                              geeft onafhankelijke en (voor de eerste analyse)kosteloze hulp voor ondernemers met
                              (financiële) problemen of groeiuitdagingen. Dit wordt mogelijk gemaakt door subsidie van
                              de provincie Utrecht.
                            </li>
                            <li>
                              Het
                              <utrecht-link href="https://ondernemersplein.kvk.nl/" class="link"
                                >Ondernemersplein van de landelijke overheid<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true">
                                    <use href="#url"></use></svg></utrecht-icon></utrecht-link
                              >&nbsp;geeft u tips en hulp bij subsidieaanvragen.
                            </li>
                            <li>
                              Het
                              <utrecht-link href="https://www.rvo.nl/subsidies-regelingen/innovatiekrediet" class="link"
                                >Innovatiefonds MKB+<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true">
                                    <use href="#url"></use></svg></utrecht-icon
                              ></utrecht-link>
                              stelt u als ondernemer in staat ideeën om te zetten in rendabele producten of diensten.
                            </li>
                            <li>
                              <utrecht-link href="https://qredits.nl/" class="link"
                                >Qredits<span class="screenreader--only">(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true">
                                    <use href="#url"></use></svg
                                ></utrecht-icon>
                              </utrecht-link>
                              is een microkrediet voor startende en beginnende ondernemers.
                            </li>
                            <li>
                              <utrecht-link href="https://www.mijngroenebedrijf.nu/" class="link"
                                >Mijn Groene Bedrijf<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true">
                                    <use href="#url"></use></svg></utrecht-icon
                              ></utrecht-link>
                              helpt ondernemers in Zeist om energiebewust te ondernemen.
                            </li>
                          </ul>
                        </utrecht-html-content>
                      </div>
                    </div>

                    <!--TYPO3SEARCH_end-->
                  </div>
                </div>
              </div>

              <div id="c11030" class="ce-follow-up section--enclosed flow flow--outside section">
                <div class="flow flow--content">
                  <div class="ce-follow-up__container flow flow--maximum-width">
                    <!--TYPO3SEARCH_begin-->

                    <utrecht-spotlight-section class="follow-up follow-up__default">
                      <div class="follow-up__content">
                        <utrecht-heading-2 class="follow-up__header header">Hulp nodig?</utrecht-heading-2>

                        <div class="follow-up__text rte-content">
                          <utrecht-paragraph
                            >Heeft u vragen of heeft u hulp nodig? Neem dan contact op met het
                            ondernemersplein.</utrecht-paragraph
                          >
                        </div>
                      </div>

                      <utrecht-button-link
                        href="/ondernemen/contact-ondernemersplein"
                        class="button follow-up__button"
                        title="contact opnemen met het ondernemersplein"
                      >
                        <span class="button__body">
                          <span class="button__label"> Ondernemersplein </span>
                        </span>
                      </utrecht-button-link>
                    </utrecht-spotlight-section>

                    <!--TYPO3SEARCH_end-->
                  </div>
                </div>
              </div>
            </section>
          </div>
        </utrecht-page-body>
        <utrecht-page-footer>
          <utrecht-paragraph><slot name="page-footer"></slot></utrecht-paragraph>
        </utrecht-page-footer>
      </div>`;
  }
}

customElements.define('demo-page', DemoPageElement);
