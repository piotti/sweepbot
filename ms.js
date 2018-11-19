function Minesweeper(w, p) {
    var A = this;
    var j;
    var x;
    var b;
    var n;
    var J;
    var G;
    var C;
    var E;
    var d;
    var P = new B();
    var H;
    var h;
    var a;
    var Q;
    var I;
    var q;
    var l;
    var z;
    var f;
    var t;
    var e;
    var y;
    L();
    this.newGame = function() {
        var Y, W;
        var V, X;
        var U;
        V = N();
        U = p();
        j = U.gameTypeId;
        x = U.numRows;
        b = U.numCols;
        n = U.numMines;
        J = U.zoom;
        X = (N() != V);
        u(J);
        if (X) {
            R()
        }
        m();
        if (!X) {
            for (Y = 1; Y <= x; Y++) {
                for (W = 1; W <= b; W++) {
                    E[Y][W].setClass("square blank")
                }
            }
        }
        P.stop();
        P.reset();
        G = n;
        C = x * b - n;
        S();
        H = false;
        h = false;
        a = 0;
        Q = 0;
        z = false;
        f = false;
        t = false;
        isMouseDownForCtrlClick = false;
        e = null;
        y = false;
        $("#face")[0].className = "facesmile";
        hoveredSquareId = ""
    }
    ;
    this.resize = function(U) {
        var V = o(U);
        u(U);
        $("#game-container").removeClass("z" + J * 100).addClass("z" + U * 100);
        $("#face").css({
            "margin-left": Math.floor(V) + "px",
            "margin-right": Math.ceil(V) + "px"
        });
        J = U
    }
    ;
    function u(U) {
        $("#game-container, #game").width(U * (b * 16 + 20));
        $("#game").height(U * (x * 16 + 30 + 26 + 6))
    }
    function o(U) {
        return (U * b * 16 - 6 * Math.ceil(U * 13) - U * 2 * 6 - U * 26) / 2
    }
    function N() {
        return x + "_" + b + "_" + n
    }
    function R() {
        var X, U;
        var V = [];
        var W = o(J);
        V.push('<div class="bordertl"></div>');
        for (U = 0; U < b; U++) {
            V.push('<div class="bordertb"></div>')
        }
        V.push('<div class="bordertr"></div>');
        V.push('<div class="borderlrlong"></div>', '<div class="time0" id="mines_hundreds"></div>', '<div class="time0" id="mines_tens"></div>', '<div class="time0" id="mines_ones"></div>', '<div class="facesmile" style="margin-left:', Math.floor(W), "px; margin-right: ", Math.ceil(W), 'px;" id="face"></div>', '<div class="time0" id="seconds_hundreds"></div>', '<div class="time0" id="seconds_tens"></div>', '<div class="time0" id="seconds_ones"></div>', '<div class="borderlrlong"></div>');
        V.push('<div class="borderjointl"></div>');
        for (U = 0; U < b; U++) {
            V.push('<div class="bordertb"></div>')
        }
        V.push('<div class="borderjointr"></div>');
        for (X = 1; X <= x; X++) {
            V.push('<div class="borderlr"></div>');
            for (U = 1; U <= b; U++) {
                V.push('<div class="square blank" id="', X, "_", U, '"></div>')
            }
            V.push('<div class="borderlr"></div>')
        }
        V.push('<div class="borderbl"></div>');
        for (U = 0; U < b; U++) {
            V.push('<div class="bordertb"></div>')
        }
        V.push('<div class="borderbr"></div>');
        for (U = 0; U <= b + 1; U++) {
            V.push('<div class="square blank" style="display: none;" id="', 0, "_", U, '"></div>')
        }
        for (U = 0; U <= b + 1; U++) {
            V.push('<div class="square blank" style="display: none;" id="', x + 1, "_", U, '"></div>')
        }
        for (X = 1; X <= x; X++) {
            V.push('<div class="square blank" style="display: none;" id="', X, "_", 0, '"></div>');
            V.push('<div class="square blank" style="display: none;" id="', X, "_", b + 1, '"></div>')
        }
        $("#game").html(V.join(""))
    }
    function s(Z, V) {
        var X = 0;
        var W = false;
        var U = false;
        var Y = false;
        this.addToValue = function(aa) {
            X += aa
        }
        ;
        this.isMine = function() {
            return X < 0
        }
        ;
        this.isFlagged = function() {
            return W
        }
        ;
        this.isMarked = function() {
            return U
        }
        ;
        this.isRevealed = function() {
            return Y
        }
        ;
        this.isHidden = function() {
            return Z < 1 || Z > x || V < 1 || V > b
        }
        ;
        this.getRow = function() {
            return Z
        }
        ;
        this.getCol = function() {
            return V
        }
        ;
        this.getValue = function() {
            return X
        }
        ;
        this.setRevealed = function(aa) {
            Y = aa
        }
        ;
        this.plantMine = function() {
            X -= 10;
            E[Z - 1][V - 1].addToValue(1);
            E[Z - 1][V].addToValue(1);
            E[Z - 1][V + 1].addToValue(1);
            E[Z][V - 1].addToValue(1);
            E[Z][V + 1].addToValue(1);
            E[Z + 1][V - 1].addToValue(1);
            E[Z + 1][V].addToValue(1);
            E[Z + 1][V + 1].addToValue(1)
        }
        ;
        this.unplantMine = function() {
            X += 10;
            E[Z - 1][V - 1].addToValue(-1);
            E[Z - 1][V].addToValue(-1);
            E[Z - 1][V + 1].addToValue(-1);
            E[Z][V - 1].addToValue(-1);
            E[Z][V + 1].addToValue(-1);
            E[Z + 1][V - 1].addToValue(-1);
            E[Z + 1][V].addToValue(-1);
            E[Z + 1][V + 1].addToValue(-1)
        }
        ;
        this.setClass = function(aa) {
            document.getElementById(Z + "_" + V).className = aa
        }
        ;
        this.reveal1 = function() {
            var aa, ab;
            var ac, ad;
            var ae = [];
            ae.push(this);
            this.pushed = true;
            while (ae.length > 0) {
                ac = ae.pop();
                if (!ac.isRevealed() && !ac.isFlagged()) {
                    if (ac.isMine()) {
                        return false
                    } else {
                        if (!ac.isFlagged()) {
                            ac.setClass("square open" + ac.getValue());
                            ac.setRevealed(true);
                            if (ac.getValue() == 0) {
                                a++
                            } else {
                                Q++
                            }
                            if (!ac.isHidden() && --C == 0) {
                                F();
                                return true
                            }
                            if (ac.getValue() == 0 && !ac.isHidden()) {
                                for (aa = -1; aa <= 1; aa++) {
                                    for (ab = -1; ab <= 1; ab++) {
                                        ad = E[ac.getRow() + aa][ac.getCol() + ab];
                                        if (!ad.pushed && !ad.isHidden() && !ad.isRevealed()) {
                                            ae.push(ad);
                                            ad.pushed = true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return true
        }
        ;
        this.reveal9 = function() {
            if (Y) {
                var ab, ac;
                var ad;
                var ae = 0;
                var aa = [];
                for (ab = -1; ab <= 1; ab++) {
                    for (ac = -1; ac <= 1; ac++) {
                        ad = E[Z + ab][V + ac];
                        if (ad != this && ad.isFlagged()) {
                            ae++
                        }
                    }
                }
                if (ae == X) {
                    for (ab = -1; ab <= 1; ab++) {
                        for (ac = -1; ac <= 1; ac++) {
                            ad = E[Z + ab][V + ac];
                            if (ad != this && !ad.reveal1()) {
                                aa.push(ad)
                            }
                        }
                    }
                    if (aa.length > 0) {
                        M(aa)
                    }
                }
            }
        }
        ;
        this.flag = function(aa) {
            if (!Y) {
                if (W) {
                    if ($("#marks").attr("checked")) {
                        this.setClass("square question");
                        U = true
                    } else {
                        this.setClass("square blank");
                        if (aa) {
                            this._showFlagAnimation(true)
                        }
                    }
                    W = false;
                    G++;
                    S()
                } else {
                    if (U) {
                        this.setClass("square blank");
                        U = false
                    } else {
                        this.setClass("square bombflagged");
                        W = true;
                        G--;
                        S();
                        if (aa) {
                            this._showFlagAnimation()
                        }
                    }
                }
            }
        }
        ;
        this._showFlagAnimation = function(ab) {
            var ah = $("#" + Z + "_" + V);
            var ac = ah.offset();
            var af = ac.left + ah.width() / 2;
            var ae = ac.top + ah.height() / 2;
            var ak = 57 * J * 1.75;
            var ad = 79 * J * 1.75;
            var aa = {
                left: af - ak / 2,
                top: ae - ad / 2,
                width: ak + "px",
                height: ad + "px",
                opacity: 0
            };
            var ai = {
                left: af,
                top: ae,
                width: 0,
                height: 0,
                opacity: 1
            };
            if (ab) {
                var aj = aa;
                aa = ai;
                ai = aj
            }
            var ag = $('<img src="flag.png" class="flag-animation"></div>').css(aa);
            $("body").append(ag);
            setTimeout(function() {
                ag.css(ai)
            }, 0);
            setTimeout(function() {
                ag.remove()
            }, 500)
        }
    }
    function m() {
        var X, U, V;
        var W;
        E = [];
        d = [];
        I = [];
        V = 0;
        for (X = 0; X <= x + 1; X++) {
            E[X] = [];
            for (U = 0; U <= b + 1; U++) {
                W = new s(X,U);
                E[X][U] = W;
                d[X + "_" + U] = W;
                if (!W.isHidden()) {
                    I[V++] = W
                }
            }
        }
        for (V = 0; V < n; V++) {
            I.splice(Math.floor(Math.random() * I.length), 1)[0].plantMine()
        }
    }
    function r(ac) {
        var U = ac.getRow();
        var aa = ac.getCol();
        var Z, V;
        var Y;
        var ab;
        var W;
        if (ac.isMine()) {
            I.splice(Math.floor(Math.random() * I.length), 1)[0].plantMine();
            ac.unplantMine();
            I.push(ac)
        }
        var ab = [];
        for (var X = 0; X < I.length; X++) {
            W = I[X];
            if (W.getRow() < U - 1 || W.getRow() > U + 1 || W.getCol() < aa - 1 || W.getCol() > aa + 1) {
                ab.push(W)
            }
        }
        for (Z = -1; Z <= 1; Z++) {
            for (V = -1; V <= 1; V++) {
                Y = E[U + Z][aa + V];
                if (Y.isMine() && ab.length > 0) {
                    ab.splice(Math.floor(Math.random() * ab.length), 1)[0].plantMine();
                    Y.unplantMine()
                }
            }
        }
        P.start();
        if ((U == 1 && aa == 1) || (U == 1 && aa == b) || (U == x && aa == 1) || (U == x && aa == b)) {
            return 1
        } else {
            if (U == 1 || U == x || aa == 1 || aa == b) {
                return 2
            } else {
                return 3
            }
        }
    }
    function T(U) {
        if (j > 0) {
            k();
        }
    }
    function k() {
        var U = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var V;
        q = "";
        for (var V = 0; V < 3; V++) {
            q += U.charAt(Math.floor(Math.random() * U.length))
        }
        q += 4 * (Math.floor(Math.random() * 225) + 25) + j;
        for (var V = 0; V < 4; V++) {
            q += U.charAt(Math.floor(Math.random() * U.length))
        }
    }
    function B() {
        var W;
        var X;
        var Y;
        function V() {
            var ac = new Date().getTime();
            var Z = X * 1000;
            var ab = ac - W;
            var aa = 1000 - (ab - Z);
            Y = setTimeout(V, aa);
            X++;
            U()
        }
        function U() {
            var Z = v(X);
            document.getElementById("seconds_hundreds").className = "time" + Z[0];
            document.getElementById("seconds_tens").className = "time" + Z[1];
            document.getElementById("seconds_ones").className = "time" + Z[2]
        }
        this.start = function() {
            X = 0;
            W = new Date().getTime();
            V()
        }
        ;
        this.stop = function() {
            clearTimeout(Y)
        }
        ;
        this.reset = function() {
            X = 0;
            U()
        }
        ;
        this.getTime = function() {
            return X
        }
    }
    function S() {
        var U = v(G);
        document.getElementById("mines_hundreds").className = "time" + U[0];
        document.getElementById("mines_tens").className = "time" + U[1];
        document.getElementById("mines_ones").className = "time" + U[2]
    }
    function v(U) {
        U = Math.min(U, 999);
        if (U >= 0) {
            return [Math.floor(U / 100), Math.floor((U % 100) / 10), U % 10]
        } else {
            return ["-", Math.floor((-U % 100) / 10), -U % 10]
        }
    }
    function M(U) {
        var Y, V, W;
        var X;
        document.getElementById("face").className = "facedead";
        P.stop();
        H = true;
        for (Y = 1; Y <= x; Y++) {
            columnloop: for (V = 1; V <= b; V++) {
                X = E[Y][V];
                if (!X.isRevealed()) {
                    for (W = 0; W < U.length; W++) {
                        if (X == U[W]) {
                            X.setClass("square bombdeath");
                            continue columnloop
                        }
                    }
                    if (X.isMine() && !X.isFlagged()) {
                        X.setClass("square bombrevealed")
                    } else {
                        if (!X.isMine() && X.isFlagged()) {
                            X.setClass("square bombmisflagged")
                        }
                    }
                }
            }
        }
    }
    function F() {
        var Z, U;
        var W;
        var V;
        var X;
        var Y = false;
        document.getElementById("face").className = "facewin";
        P.stop();
        H = true;
        G = 0;
        S();
        for (Z = 1; Z <= x; Z++) {
            for (U = 1; U <= b; U++) {
                W = E[Z][U];
                if (!W.isRevealed() && !W.isFlagged()) {
                    W.setClass("square bombflagged")
                }
            }
        }
        if (j > 0) {
            X = P.getTime();
            for (V = 3; V >= 0; V--) {
                if (X <= w[V][j - 1]) {
                    D(V + 1, true);
                    Y = true;
                    break
                }
            }
            if (!Y && ((j == 1 && X <= 10) || (j == 2 && X <= 50) || (j == 3 && X <= 150))) {
                D(1, false)
            }
            if (A.onWin) {
                A.onWin(j, X)
            }
        }
    }
    function D(X, aa) {
        var U;
        var V, Y;
        var W = (new Date()).getTime();
        var Z;
        switch (X) {
        case 1:
            U = "daily";
            break;
        case 2:
            U = "weekly";
            break;
        case 3:
            U = "monthly";
            break;
        case 4:
            U = "all-time";
            break;
        default:
            U = "";
            break
        }
        Y = (K() && !!localStorage.name) ? localStorage.name : "";
        if (aa) {
            V = prompt(P.getTime() + " is a new " + U + " high score! Please enter your name", Y)
        } else {
            V = prompt("Please enter your name to submit your score (" + P.getTime() + ")", Y)
        }
        V = $.trim(V);
        if (V.length > 25) {
            V.substring(0, 25)
        }
        if (V && K()) {
            localStorage.name = V
        }
        Z = Math.round(((new Date()).getTime() - W) / 1000);
    }
    function K() {
        try {
            return "localStorage"in window && window.localStorage !== null
        } catch (U) {
            return false
        }
    }
    function O(U) {
        return U.className.substring(0, 6) == "square"
    }
    function g(V) {
        var U = {};
        if (l) {
            U.left = V.button == 1 || V.button == 3 || V.button == 4;
            U.right = V.button == 2 || V.button == 3 || V.button == 4
        } else {
            U.left = V.button == 0 || V.button == 1;
            U.right = V.button == 2 || V.button == 1
        }
        return U
    }
    function i(W, V, U) {
        if (!W.isRevealed()) {
            if (W.isMarked()) {
                W.setClass(U)
            } else {
                if (!W.isFlagged()) {
                    W.setClass(V)
                }
            }
        }
    }
    function c(Y, X, W) {
        var U, V;
        for (U = -1; U <= 1; U++) {
            for (V = -1; V <= 1; V++) {
                i(E[Y.getRow() + U][Y.getCol() + V], X, W)
            }
        }
    }
    function L() {
        var W = false;
        var Y;
        function V(ac) {
            if (ac.type === "touchmove" && !aa(ac)) {
                return
            }
            var ab = U(ac);
            if (ab != Y && !z) {
                if (t) {
                    if (Y) {
                        c(d[Y.id], "square blank", "square question")
                    }
                    if (O(ab)) {
                        c(d[ab.id], "square open0", "square questionpressed")
                    }
                } else {
                    if (Y) {
                        i(d[Y.id], "square blank", "square question")
                    }
                    if (O(ab)) {
                        i(d[ab.id], "square open0", "square questionpressed")
                    }
                }
            }
            Y = (O(ab)) ? ab : undefined
        }
        function Z(ac) {
            if (ac.type === "touchmove" && !aa(ac)) {
                return
            }
            var ab = U(ac);
            document.getElementById("face").className = (ab.id == "face") ? "facepressed" : "facesmile"
        }
        function U(ab) {
            if (ab.type === "touchmove" || ab.type === "touchend") {
                var ac = ab.originalEvent.changedTouches[0];
                return document.elementFromPoint(ac.clientX, ac.clientY)
            } else {
                return ab.target
            }
        }
        function aa(ab) {
            if (!e) {
                return false
            }
            var ac = (ab.originalEvent.changedTouches[0].identifier === e);
            return ac
        }
        l = $.browser.msie && parseFloat($.browser.version) <= 7;
        $(document).bind("gesturestart", function(ab) {
            y = true;
            X()
        });
        $(document).bind("gestureend", function(ab) {
            y = false
        });
        $(document).bind("scroll", X);
        function X() {
            if (!e) {
                return
            }
            e = null;
            if (Y) {
                i(d[Y.id], "square blank", "square question");
                Y = undefined
            }
            if (!H) {
                document.getElementById("face").className = "facesmile"
            }
        }
        $(document).bind("touchstart", function(ad) {
            // console.log(ad);
            $(document).unbind("mousedown").unbind("mouseup");
            if (e || y) {
                return
            }
            e = ad.originalEvent.changedTouches[0].identifier;
            if (O(ad.target) && !H) {
                var ac = e;
                var ab = ad.target;
                setTimeout(function() {
                    if (ac === e && ab === Y) {
                        d[ab.id].flag(true);
                        e = null;
                        document.getElementById("face").className = "facesmile"
                    }
                }, 500);
                $(document).bind("touchmove", V);
                document.getElementById("face").className = "faceooh";
                Y = undefined;
                V(ad)
            } else {
                if (ad.target.id == "face") {
                    W = true;
                    $(document).bind("touchmove", V);
                    document.getElementById("face").className = "facepressed"
                }
            }
        });
        $(document).bind("touchend", function(ac) {
            // console.log(ac);
            if (!aa(ac)) {
                return
            }
            e = null;
            $(document).unbind("touchmove", V).unbind("touchmove", Z);
            if (W || !H) {
                document.getElementById("face").className = "facesmile"
            }
            var ab = U(ac);
            if (O(ab) && !H) {
                square = d[ab.id];
                if (!h) {
                    squareTypeId = r(square)
                }
                if (square.isRevealed()) {
                    square.reveal9()
                } else {
                    if (square.isFlagged()) {
                        square.flag(true)
                    } else {
                        if (!square.reveal1()) {
                            M([square])
                        }
                        if (!h) {
                            T(squareTypeId);
                            h = true
                        }
                    }
                }
                ac.preventDefault()
            } else {
                if (ab.id == "face" && W) {
                    A.newGame()
                }
            }
            W = false
        });
        $(document).mousedown(function(ac) {
            // console.log(ac);
            var ab = g(ac);
            f = ab.left || f;
            t = ab.right || t;
            if (ac.ctrlKey && O(ac.target) && !H) {
                d[ac.target.id].flag();
                isMouseDownForCtrlClick = true
            } else {
                if (f) {
                    if (O(ac.target) && !H) {
                        ac.preventDefault();
                        $(document).bind("mousemove", V);
                        document.getElementById("face").className = "faceooh";
                        Y = undefined;
                        V(ac)
                    } else {
                        if (ac.target.id == "face") {
                            ac.preventDefault();
                            W = true;
                            $(document).bind("mousemove", Z);
                            document.getElementById("face").className = "facepressed"
                        }
                    }
                } else {
                    if (t) {
                        if (O(ac.target) && !H) {
                            d[ac.target.id].flag()
                        }
                        return false
                    }
                }
            }
        });
        $(document).on("contextmenu", function(ac) {
            var ab = $(ac.target);
            if (ab.is("#game") || ab.closest("#game").length > 0) {
                return
            }
            t = false
        });
        $(document).mouseup(function(ae) {
            // console.log(ae);
            var ab = g(ae);
            var ad;
            var ac;
            if (isMouseDownForCtrlClick) {
                f = false;
                t = false;
                isMouseDownForCtrlClick = false;
                return
            }
            if (ab.left) {
                // console.log('yep left');
                f = false;
                $(document).unbind("mousemove", V).unbind("mousemove", Z);
                if (W || !H) {
                    document.getElementById("face").className = "facesmile"
                }
                if (O(ae.target) && !H) {
                    // console.log('yep O(target)');   
                    ad = d[ae.target.id];
                    if (t) {
                        // console.log('t'+t);
                        z = true;
                        c(d[ae.target.id], "square blank", "square question");
                        ad.reveal9()
                    } else {
                        if (!z) {
                            if (!h) {
                                ac = r(ad)
                            }
                            if (!ad.reveal1()) {
                                M([ad])
                            }
                            if (!h) {
                                T(ac);
                                h = true
                            }
                        }
                        z = false
                    }
                } else {
                    if (ae.target.id == "face" && W) {
                        A.newGame()
                    }
                }
                W = false
            }
            if (ab.right) {
                t = false;
                if (O(ae.target) && !H) {
                    if (f) {
                        ad = d[ae.target.id];
                        z = true;
                        c(ad, "square blank", "square question");
                        ad.reveal9()
                    } else {
                        z = false
                    }
                    if (!H) {
                        document.getElementById("face").className = "facesmile"
                    }
                }
            }
        });
        $(document).keydown(function(ab) {
            if (ab.which == 113) {
                A.newGame()
            } else {
                if (ab.which == 32) {
                    if (hoveredSquareId && !H) {
                        square = d[hoveredSquareId];
                        if (square.isRevealed()) {
                            square.reveal9()
                        } else {
                            square.flag()
                        }
                    }
                    ab.preventDefault()
                }
            }
        });
        $("#game").mouseover(function(ab) {
            // console.log(ab);
            if (O(ab.target)) {
                hoveredSquareId = ab.target.id
            }
        });
        $("#game").mouseout(function(ab) {
            // console.log(ab);
            if (O(ab.target)) {
                if (hoveredSquareId = ab.target.id) {
                    hoveredSquareId = ""
                }
            }
        })
    }
}
;