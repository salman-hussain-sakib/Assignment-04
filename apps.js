var totalCount = document.getElementById("totalCount");
var interviewCount = document.getElementById("interviewCount");
var rejectedCount = document.getElementById("rejectedCount");
var sectionJobsCount = document.getElementById("sectionJobsCount");

var emptyState = document.getElementById("emptyState");

var allTabs = document.querySelectorAll("[data-tab]");

var activeTab = "all";
function getCards() {
  return document.querySelectorAll("#jobsList article");
}

function getStatus(card) {
  return card.getAttribute("data-status");
}

function setStatus(card, status) {
  card.setAttribute("data-status", status);
}

function updateBadge(card) {
  var badge = card.querySelector(".badge");
  var status = getStatus(card);

  if (status === "not_applied") {
    badge.innerText = "NOT APPLIED";
    badge.className = "badge badge-info badge-outline";
  } else if (status === "interview") {
    badge.innerText = "INTERVIEW";
    badge.className = "badge badge-success";
  } else if (status === "rejected") {
    badge.innerText = "REJECTED";
    badge.className = "badge badge-error";
  }
}

function updateCounts() {
  var cards = getCards();

  var total = 0;
  var interview = 0;
  var rejected = 0;

  for (var i = 0; i < cards.length; i++) {
    var status = getStatus(cards[i]);

    total++;

    if (status === "interview") {
      interview++;
    } else if (status === "rejected") {
      rejected++;
    }
  }

  totalCount.innerText = total;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
}

function showByTab(type) {
  var cards = getCards();
  var visible = 0;

  for (var i = 0; i < cards.length; i++) {
    var status = getStatus(cards[i]);

    if (type === "all") {
      cards[i].style.display = "block";
      visible++;
    } else if (type === "interview") {
      if (status === "interview") {
        cards[i].style.display = "block";
        visible++;
      } else {
        cards[i].style.display = "none";
      }
    } else if (type === "rejected") {
      if (status === "rejected") {
        cards[i].style.display = "block";
        visible++;
      } else {
        cards[i].style.display = "none";
      }
    }
  }

  sectionJobsCount.innerText = visible + " jobs";

  if (visible === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}


for (var t = 0; t < allTabs.length; t++) {
  allTabs[t].onclick = function () {
    
    for (var j = 0; j < allTabs.length; j++) {
      allTabs[j].classList.remove("tab-active");
    }

    
    this.classList.add("tab-active");

   
    activeTab = this.getAttribute("data-tab");

    showByTab(activeTab);
  };
}