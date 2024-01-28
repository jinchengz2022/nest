'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">email-nest-test documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' :
                                            'id="xs-controllers-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' :
                                        'id="xs-injectables-links-module-AppModule-c4bdba024ade0ae39bcd63b97fa49ddd076158a7dbb8a30669f441586b451d6798ea8ae426f1fdd647c367c70f061cc350e2c132e0ab4c7d004bf3cdfef4d588"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' : 'data-bs-target="#xs-controllers-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' :
                                            'id="xs-controllers-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' :
                                        'id="xs-injectables-links-module-EmailModule-4466515525cff7bf24a87a103dda9de8ff1e2baed887fb1d50696dde4cc79f52b9f7b2034a85adafd34a12ea47f576a391f91dbfcfa1ff3b74098875c0403f32"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' : 'data-bs-target="#xs-controllers-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' :
                                            'id="xs-controllers-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' }>
                                            <li class="link">
                                                <a href="controllers/RedisController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' :
                                        'id="xs-injectables-links-module-RedisModule-9ba226fd69852e009bc97b8e94af54299d966457b97b6d36e6f2a461cc98eb1c01031594b00ac7fb65e492591fc783c08a59e5e93bfe8dd222f6c546a942e8ad"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' : 'data-bs-target="#xs-controllers-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' :
                                            'id="xs-controllers-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' : 'data-bs-target="#xs-injectables-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' :
                                        'id="xs-injectables-links-module-UserModule-89d78effc28e9cfd47f2727e88002578a45d6802e10ffcab1d00801992ef903b8fdf5682109653a0a8785b9338e100e81ecf9204bfc75760c088495f9d87e53d"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateEmailDto.html" data-type="entity-link" >CreateEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRediDto.html" data-type="entity-link" >CreateRediDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Email.html" data-type="entity-link" >Email</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Redi.html" data-type="entity-link" >Redi</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmailDto.html" data-type="entity-link" >UpdateEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRediDto.html" data-type="entity-link" >UpdateRediDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});